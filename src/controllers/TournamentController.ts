import User from "../models/UserModel";
import Rules from "../models/TournamentRulesModel";
import Tournament from "../models/TournamentModel";

class TournamentController {
  // static async createRules(req, res, next) {
  //   const {
  //     rulesName,
  //     age,
  //     subdistrict,
  //     minParticipant,
  //     maxParticipant,
  //   } = req.body;
  //   try {
  //     const rules = await Rules.findOne({ rulesName });
  //     if (rules) {
  //       res.send("throw ga kebaca");
  //       // throw ({ name: "ALREADY_EXIST" };)
  //     } else {
  //       const rules = new Rules({
  //         rulesName,
  //         age,
  //         subdistrict,
  //         minParticipant,
  //         maxParticipant,
  //       });
  //       rules.save();
  //       res.status(201).json({
  //         message: `rules ${rules.rulesName} has been created`,
  //         data: rules,
  //       });
  //     }
  //   } catch {}
  // }
  // static async createTournament(req, res, next) {
  //   const {
  //     tournamentName,
  //     tournamentOpen,
  //     tournamentStart,
  //     tournamentClose,
  //     tournamentType,
  //     tournamentRulesName,
  //   } = req.body;
  //   try {
  //     const tournament = await Tournament.findOne({ tournamentName });
  //     if (tournament) {
  //     } else {
  //     }
  //   } catch (err) {
  //     res.send(err);
  //   }
  // }
}

export default TournamentController;
