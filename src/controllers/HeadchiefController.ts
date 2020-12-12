import User from "../models/UserModel";
import Profile from "../models/User_ProfileModel";

class HeadChiefController {
  static async assign(req, res, next) {
    const { subDistrict, _id } = req.body;
    const district = await Profile.findOne({ subDistrict });
    const roles = await User.findOne({ role: "user" });
    if (district) {
      if (roles) {
        const update = await User.findOneAndUpdate(
          { _id },
          { $set: { role: "comittee" } }
        );
        res.status(201).send({ message: "Successfully update" });
        console.log(update);
      } else {
        res.status(403).send({ message: "you only assign to comittee" });
      }
    } else {
      res.status(403).send({
        message: "you already assign the comittee of this subdistrict",
      });
    }
  }

  static async seeTournamentParticipantList(req, res, next) {
    // const data= await TournamentReport.find ({_tournamentId,stageName:'participantList'})
    // const tournament= await Tournament.findOne ({_tournamentId})
    // const rules= await TournamentRules.findOne ({tournament._tournamentRulesId})
    // res.json({rules.maxParticipant, data, data.participant.length})
  }

  static async exportTournamentParticipantList(req, res, next) {
    //   export data ke csv/json dari tournamentReport
  }
}

export default HeadChiefController;
