import { shuffle } from "lodash";
import User from "../models/UserModel";
import UserProfile from "../models/User_ProfileModel";
import Rules from "../models/TournamentRulesModel";
import Tournament from "../models/TournamentModel";
import TournamentRules from "../models/TournamentRulesModel";
import TournamentReport from "../models/TournamentReportModel";
import TournamentStage from "../models/TournamentStageModel";
import Group from "../models/GroupModel";
import Inbox from "../models/InboxModel";
import moment from "moment";

class CommitteeController {
  static async createRules(req, res, next) {
    const {
      groupMember,
      age,
      subdistrict,
      minParticipant,
      maxParticipant,
    } = req.body;
    const member: any =
      !groupMember || groupMember == undefined || groupMember == null
        ? 1
        : groupMember;
    const rulesName: any = `${age}_${member}_${subdistrict}`;

    try {
      const rules = await Rules.findOne({ rulesName });
      if (rules) {
        console.log(!groupMember);

        next({ name: "RULES_EXIST" });
      } else {
        const rules = new Rules({
          rulesName,
          groupMember,
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
    } catch {
      next({ name: "NOT_FOUND" });
    }
  }

  static async editRules(req, res, next) {
    // edit rules turnamen
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
    const open: number = new Date(tournamentOpen).valueOf();
    const start: number = new Date(tournamentStart).valueOf();
    const close: number = new Date(tournamentClose).valueOf();
    const now: number = Date.now().valueOf();
    const tournament = await Tournament.findOne({ tournamentName });
    if (tournament) {
      next({ name: "TOURNAMENT_EXIST" });
    } else {
      const rules = await TournamentRules.findOne({ rulesName });
      if (!rules) {
        next({ name: "RULES_NOT_FOUND" });
      } else {
        if (close > start && start > open && open > now) {
          const tournament = await new Tournament({
            tournamentName,
            tournamentOpen,
            tournamentStart,
            tournamentClose,
            tournamentType,
            _tournamentRulesId: rules?._id,
            groupEntry,
          });
          tournament.save();
          const tournamentReport = new TournamentReport({
            _tournamentId: tournament._id,
          });

          tournamentReport.save();

          res.status(201).json({
            success: true,
            message: `${tournamentName} tournament has successfully created`,
          });

          next();
        } else {
          next({ name: "TIME_ERR" });
        }
      }
    }
  }

  static async editTournament(req, res, next) {
    // edit tanggal turnamen, type turnamen
  }

  static async approveSubmission(req, res, next) {
    const { participant, _tournamentId, _userId, _groupId } = req.body;

    const tournament = await Tournament.findById(_tournamentId);
    const tournamentRule: any = await TournamentRules.findOne({
      _id: tournament?._tournamentRulesId,
    });
    const tournamentReport: any = await TournamentReport.findOne({
      _tournamentId,
    });

    const lists: any = await TournamentReport.findOne({
      _tournamentId,
      stageName: 0,
      // stageName: "participantList",
    });
    const user: any = await UserProfile.findOne({
      _userId: participant[0]._userId,
    });

    const birthdate: any = user?.birthDate.valueOf();
    const datenow = Date.now();
    const userAge = Math.floor((datenow - birthdate) / 31536000000);
    const rules: any = await Rules.findById(tournament?._tournamentRulesId);
    const rulesAge: any = rules?.age;

    if (user._tournamentId == null) {
      if (tournamentReport.stageName === 0) {
        if (user.subDistrict == tournamentRule.subdistrict) {
          if (tournament != null) {
            if (tournament.groupEntry == false) {
              if (tournamentRule.age == userAge) {
                if (
                  tournamentRule.maxParticipant >=
                  lists.participant.length + 1
                ) {
                  const userName: any = await User.findByIdAndUpdate(
                    participant[0]._userId,
                    {
                      $set: { role: "participant" },
                    }
                  );

                  await UserProfile.findOneAndUpdate(
                    { _userId: participant[0]._userId },
                    { $set: { _tournamentId } }
                  );

                  await TournamentReport.findOneAndUpdate(
                    { _tournamentId },
                    { $push: { participant } }
                  );

                  res.status(201).json({
                    success: true,
                    message: `${user.fullname} has been assigned to be an participant of ${tournament?.tournamentName}`,
                  });
                } else {
                  next({ name: "LIMIT_REACHED" });
                }
              } else {
                next({ name: "REQUIREMENT_NOT_MET" });
              }
            } else {
              next({ name: "GROUP_NEEDED" });
            }
          } else {
            next({ name: "TOURNAMENT_NOT_FOUND" });
          }
        } else {
          next({ name: "DIFFERENT_SUBDISTRICT" });
        }
      } else {
        next({ name: "ALREADY_LATE" });
      }
    } else {
      next({ name: "ALREADY_PARTICIPATED" });
    }
  }

  static async approveGroup(req, res, next) {
    const {
      participant,
      _tournamentId,
      groupName,
      _userId,
      _groupId,
    } = req.body;

    const entity = participant[0]._userId || participant[0]._groupId;
    const group = await Group.findOne({ _id: entity });
    const tournament = await Tournament.findById(_tournamentId);
    const tournamentRule: any = await TournamentRules.findOne({
      _id: tournament?._tournamentRulesId,
    });
    // const lists: any = await TournamentReport.findOne({
    //   _tournamentId,
    //   stageName: "participantList",
    // });
    const user: any = await UserProfile.findOne({
      _userId: entity,
    });
    // const registered: any = await UserProfile.findOne({
    //   _userId: entity,
    // });

    if (user._tournamentId == null) {
      if (tournamentRule.groupMember == group?.member.length) {
        const userName: any = await Group.findByIdAndUpdate(entity, {
          $set: { _tournamentId },
        });

        res.status(201).json({
          success: true,
          message: `${userName.groupName} has been assigned to be an participant of ${tournament?.tournamentName}`,
        });
      } else {
        res.send("kekurangan ato kelebihan");
      }
    }
  }

  static async seeParticipantList(req, res, next) {
    const { _id } = req.body;
    const lists: any = await TournamentReport.findById(_id);
    res.status(201).json({
      success: true,
      data: lists.participant,
    });
  }

  static async shufflingParticipantList(req, res, next) {
    const { _id } = req.body;
    const participant: any = await TournamentReport.findById(_id);
    const shuffled: any = shuffle(participant.participant);

    const tournament: any = await Tournament.findById(
      participant._tournamentId
    );

    if (tournament.stageName === participant.stageName) {
      const stageName: number = (await participant.stageName) + 1;
      const tournamentReport = new TournamentReport({
        _tournamentId: participant._tournamentId,
        participant: shuffled,
        stageName,
      });

      tournamentReport.save();
      const update: any = await Tournament.findByIdAndUpdate(
        participant._tournamentId,
        { $set: { stageName: tournamentReport.stageName } }
      );

      res.status(201).json({
        success: true,
        message: `${update.tournamentName} has been moving to next stage`,
      });
    } else {
      next({ name: "STAGE_ERROR" });
    }
  }

  static async proceedBranchesTournament(req, res, next) {
    const { _id } = req.body;

    const participant: any = await TournamentReport.findById(_id);
    const shuffled: any = shuffle(participant.participant);

    const tournament: any = await Tournament.findById(
      participant._tournamentId
    );

    if (tournament.stageName === participant.stageName) {
      for (let i = 0, j = shuffled.length; i < j; i += 2) {
        const temparray = shuffled.slice(i, i + 2);

        const stageName: number = (await participant.stageName) + 1;
        const tournamentReport = new TournamentReport({
          _tournamentId: participant._tournamentId,
          participant: temparray,
          stageName,
        });

        tournamentReport.save();
        const update: any = await Tournament.findByIdAndUpdate(
          participant._tournamentId,
          { $set: { stageName: tournamentReport.stageName } }
        );

        res.status(201).json({
          success: true,
          message: `${update.tournamentName} has been moving to next stage`,
        });
      }
    } else {
      next({ name: "STAGE_ERROR" });
    }
  }

  static async proceedFreeForAllTournament(req, res, next) {
    // mulai lomba free for all
  }

  static async putScore(req, res, next) {
    // naruh score ke peserta
  }

  static async finishingStage(req, res, next) {
    // nge ganti stage turnamen branches
  }

  static async postTournamentResult(req, res, next) {
    // nge post turnamen result
  }
}

export default CommitteeController;
