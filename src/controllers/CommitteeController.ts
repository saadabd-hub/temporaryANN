import User from "../models/UserModel";
import UserProfile from "../models/User_ProfileModel";
import Rules from "../models/TournamentRulesModel";
import Tournament from "../models/TournamentModel";
import TournamentRules from "../models/TournamentRulesModel";
import TournamentReport from "../models/TournamentReportModel";
import TournamentStage from "../models/TournamentStageModel";
import Inbox from "../models/InboxModel";
import moment from "moment";

class CommitteeController {
  static async createRules(req, res, next) {
    const {
      rulesName,
      age,
      subdistrict,
      minParticipant,
      maxParticipant,
    } = req.body;
    try {
      const rules = await Rules.findOne({ rulesName });
      if (rules) {
        res.send("throw ga kebaca");
        // throw { name: "ALREADY_EXIST" };
      } else {
        const rules = new Rules({
          rulesName,
          age,
          subdistrict,
          minParticipant,
          maxParticipant,
        });
        rules.save();
        res.status(201).json({
          message: `rules ${rules.rulesName} has been created`,
          data: rules,
        });
      }
    } catch { }
  }

  static async createTournament(req, res, next) {
    const {
      tournamentName,
      tournamentOpen,
      tournamentStart,
      tournamentClose,
      tournamentType,
      rulesName,
      groupEntry,
    } = req.body;

    const tournament = await Tournament.findOne({ tournamentName });
    if (tournament) {
      res.send("Tournament sudah ada");
    } else {
      const rules = await TournamentRules.findOne({ rulesName });
      if (!rules) {
        res.send("rules not found");
      } else {
        const tournament = await new Tournament({
          tournamentName,
          tournamentOpen,
          tournamentStart,
          tournamentClose,
          tournamentType,
          _tournamentRulesId: rules?._id,
          groupEntry
        });
        tournament.save();
        return res.status(201).json({
          success: true,
          message: `${tournamentName} tournament has successfully created`,
        });
      }
    }
  }

  static async scanUser(req, res, next) { }

  static async approveSubmission(req, res, next) {
    const { _userId, _tournamentId } = req.body;
    const user = await UserProfile.findOne({ _userId });
    const tournament = await Tournament.findById(_tournamentId);
    const birthdate: any = user?.birthDate.valueOf();
    const datenow = Date.now();
    const userAge = Math.floor((datenow - birthdate) / 31536000000);
    const rules: any = await Rules.findById(tournament?._tournamentRulesId);
    const rulesAge: any = rules?.age;
    const registered: any = await UserProfile.findOne({ _tournamentId });

    try {
      if (user?._tournamentId == null) {
        if (rules.maxParticipant == 100) {
          if (rulesAge == userAge) {
            const userName: any = await User.findByIdAndUpdate(_userId, {
              $set: { role: "participant" },
            });
            await UserProfile.findOneAndUpdate(
              { _userId },
              { $set: { _tournamentId } }
            );
            res.status(201).json({
              success: true,
              message: `${userName.username} has been assigned to be an participant of ${tournament?.tournamentName}`,
            });
          } else {
            res.status(201).json({
              success: false,
              message: `Tournament requirement is ${rulesAge}, but your champion is now ${userAge}`,
            });
          }
        } else {
          res.status(201).json({
            success: false,
            message: `Exceed max player limit`,
          });
        }
      } else {
        res.status(201).json({
          success: false,
          message: `Your champion has already participated in another game`,
        });
      }
    } catch { }
  }
}

export default CommitteeController;
