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

    const group: any = await Group.findById(_groupId);
    const tournament: any = await Tournament.findById(_tournamentId);
    const rules: any = await TournamentRules.findById(
      tournament._tournamentRulesId
    );
    const report: any = await TournamentReport.findOne({ _tournamentId });

    async function assignUserProfile(group, res) {}

    if (group) {
      if (group._tournamentId == null || undefined) {
        if (
          tournament.groupEntry == true &&
          group.member.length == rules.groupMember
        ) {
          if (rules.age == group.age) {
            if (rules.subdistrict == group.subDistrict) {
              if (rules.maxParticipant >= report.participant.length + 1) {
                const groupId: any = { _groupId };

                await Group.findByIdAndUpdate(_groupId, {
                  $set: { _tournamentId },
                });

                await TournamentReport.findOneAndUpdate(
                  { _tournamentId },
                  { $push: { participant: groupId } }
                );

                for (let i = 0; i < group.member.length; i++) {
                  const userProfile: any = await UserProfile.findOneAndUpdate(
                    { _userId: group.member[i]._userId },
                    {
                      $set: { _tournamentId },
                    }
                  );

                  const userName: any = await User.findByIdAndUpdate(
                    group.member[i]._userId,
                    {
                      $set: { role: "participant" },
                    }
                  );
                }

                res.status(201).json({
                  success: true,
                  message: `${group.groupName} has been assigned to be an participant of ${tournament?.tournamentName}`,
                });
              } else {
                next({ name: "LIMIT_REACHED" });
              }
            } else {
              next({ name: "DIFFERENT_SUBDISTRICT" });
            }
          } else {
            next({ name: "REQUIREMENT_NOT_MET" });
          }
        } else {
          next({ name: "INDIVIDUAL_NEEDED" });
        }
      } else {
        next({ name: "ALREADY_PARTICIPATED" });
      }
    } else {
      next({ name: "GROUP_NOT_FOUND" });
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

  static async shufflingBranchesList(req, res, next) {
    const { _id, participant, _userId } = req.body;

    const list: any = await TournamentReport.findById(_id);
    const shuffled: any = shuffle(list.participant);

    const tournament: any = await Tournament.findById(list._tournamentId);

    if (tournament.stageName === list.stageName) {
      if (list.stageName === 0) {
        for (let i = 0, j = shuffled.length; i < j; i += 2) {
          const temparray = shuffled.slice(i, i + 2);
          const stageName: number = (await list.stageName) + 1;
          const tournamentReport = new TournamentReport({
            _tournamentId: list._tournamentId,
            participant: temparray,
            stageName,
          });

          tournamentReport.save();
          const update: any = await Tournament.findByIdAndUpdate(
            list._tournamentId,
            { $set: { stageName: tournamentReport.stageName } }
          );

          res.status(201).json({
            success: true,
            message: `${update.tournamentName} has been moving to next stage`,
          });
        }
      }
    } else {
      next({ name: "STAGE_ERROR" });
    }
  }

  static async proceedBranchesTournament(req, res, next) {
    const { _id, participant, _userId } = req.body;

    const list: any = await TournamentReport.findById(_id);
    const shuffled: any = shuffle(list.participant);

    const tournament: any = await Tournament.findById(list._tournamentId);

    const update: any = await TournamentReport.findByIdAndUpdate(_id, {
      $set: { participant },
    });

    const ReportCheck: any = await TournamentReport.findOne({
      stageName: update.stageName + 1,
    });

    const userCheck: any = await TournamentReport.findOne({ participant });
    console.log(userCheck);

    async function IfElse(ReportCheck, res) {
      if (ReportCheck) {
        console.log("masuk if");
        await TournamentReport.findByIdAndUpdate(ReportCheck._id, {
          $push: { participant: participant[0] },
        });
        return res.status(201).json({
          success: true,
          message: `${participant[0]._userId} won, and going to next stage of ${tournament.tournamentName}`,
        });
      } else {
        const stageName: number = list.stageName + 1;
        const tournamentReport = new TournamentReport({
          _tournamentId: list._tournamentId,
          participant: participant[0],
          stageName,
        });
        tournamentReport.save();
        await Tournament.findByIdAndUpdate(list._tournamentId, {
          $set: { stageName },
        });

        return res.status(201).json({
          success: true,
          message: `${participant[1]._userId} won, and going to next stage of ${tournament.tournamentName}`,
        });
      }
    }

    if (ReportCheck.participant._userId) {
      next({ name: "ALREADY_HAVE_WINNER" });
    } else {
      if (update.participant.length == 1) {
        console.log("masuk 1");

        IfElse(ReportCheck, res);
      } else {
        if (update.participant[0].score > update.participant[1].score) {
          console.log("masuk 2");
          IfElse(ReportCheck, res);
        } else {
          console.log("masuk 3");
          if (ReportCheck) {
            console.log("masuk 4");
            console.log(ReportCheck.participant);

            await TournamentReport.findByIdAndUpdate(ReportCheck._id, {
              $push: { participant: participant[1] },
            });
            return res.status(201).json({
              success: true,
              message: `${participant[1]._userId} won, and going to next stage of ${tournament.tournamentName}`,
            });
          } else {
            console.log("masuk 5");
            const stageName: number = list.stageName + 1;
            const tournamentReport = new TournamentReport({
              _tournamentId: list._tournamentId,
              participant: participant[1],
              stageName,
            });

            tournamentReport.save();
            // .then(() => {
            await Tournament.findByIdAndUpdate(list._tournamentId, {
              $set: { stageName },
            });
            // });
            return res.status(201).json({
              success: true,
              message: `${participant[1]._userId} won, and going to next stage of ${tournament.tournamentName}`,
            });
          }
        }
      }
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
