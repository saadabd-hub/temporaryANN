import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
// const bcrypt = require("bcrypt");
import User from "../models/UserModel";
import UserProfile from "../models/User_ProfileModel";
import _ from "lodash";
import Tournament from "../models/TournamentModel";
import TournamentReport from "../models/TournamentReportModel";
require("dotenv").config();

class UserController {
  static async signup(req, res, next) {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    const usernameCheck = await User.findOne({ username });

    if (emailCheck) {
      next({ name: "EMAIL_EXIST" });
    } else {
      if (usernameCheck) {
        next({ name: "USERNAME_EXIST" });
      } else {
        const user = new User({
          username,
          email,
          password,
        });
        user.save();
        next();
      }
    }
  }

  static async signin(req, res, next) {
    const {
      email,
      username,
      password,
      verifyingToken,
      birthDate,
      subDistrict,
      phoneNumber,
      fullname,
    } = req.body;
    const Check: any = await User.findOne({ $or: [{ email }, { username }] });
    const Pass: any = bcrypt.compare(password, Check?.password);
    const Profile: any = await UserProfile.findOne({ _userId: Check._id });

    if ((await Check) && (await Pass)) {
      if (Profile) {
        next();
      } else {
        const secret: any = process.env.JWT_Activate;
        jwt.verify(verifyingToken, secret, (err, decoded) => {
          if (decoded.email != email || decoded.username != username) {
            next({ name: "INVALID_TOKEN" });
          } else {
            const profile = new UserProfile({
              _userId: Check._id,
              birthDate,
              subDistrict,
              phoneNumber,
              fullname,
            });
            profile.save();
            next();
          }
        });
      }
    } else {
      next({ name: "NOT_FOUND" });
    }
  }

  static async proceed_signin(req, res, next) {
    const { email, username } = req.body;
    const Found: any = await User.findOne({ $or: [{ email }, { username }] });
    const secret_key: any = process.env.JWT_Accesstoken;
    const access_token: any = jwt.sign({ _id: Found._id }, secret_key);
    const Res = res.status(201).json({
      success: true,
      message: `${username || email} has successfully login`,
      access_token,
    });
    if (Found.role == "unregistered") {
      await User.findOneAndUpdate(
        { $or: [{ email }, { username }] },
        { $set: { role: "user" } }
      );
      Res;
    } else {
      Res;
    }
  }

  static async forgotPassword(req, res, next) {
    const { email } = req.body;
    const Check: any = await User.findOne({ email });
    if (Check) {
      next();
    } else {
      next({ name: "USER_NOT_FOUND" });
    }
  }

  static resetPassword(req, res, next) {
    const { resetLink, newPassword, email } = req.body;
    if (resetLink) {
      const jwtforgottoken: any = process.env.JWT_ForgotPassword;
      jwt.verify(resetLink, jwtforgottoken, function (error, decodedData) {
        if (decodedData.email != email) {
          throw { name: "INVALID_TOKEN" };
        } else {
          User.findOne({ resetLink }, (err, user) => {
            if (err || !user) {
              throw { name: "NOT_FOUND" };
            } else {
              const salt = bcrypt.genSaltSync(10);
              const password = bcrypt.hashSync(newPassword, salt);
              return User.findOneAndUpdate(
                { resetLink },
                { $set: { password } }
              )
                .then(() => {
                  if (err) {
                    throw { name: "INVALID_TOKEN" };
                  } else {
                    User.findOneAndUpdate(
                      { email },
                      { $set: { resetLink: null } }
                    ).then(() => {
                      res.status(200).json({
                        success: true,
                        message: `Password successfully changed`,
                      });
                    });
                  }
                })
                .catch(next);
            }
          });
        }
      });
    } else throw { name: "INVALID_TOKEN" };
  }

  static tournamentAvailable(req, res, next) {
    // const data= await TournamentReport.find ({_tournamentId,stageName:'participantList'})
    // const tournament= await Tournament.findOne ({_tournamentId})
    // const rules= await TournamentRules.findOne ({tournament._tournamentRulesId})
    // if(rules.maxParticipant >= data.participant.length )
  }
  static participantAvailable(req, res, next){
    const {_userId} = req.params;
    const participant = TournamentReport.findOne({participant: {$elemMatch:{_userId}}});
    if(participant){
      res.status(201).json({message: 'Participant is Available', participant})
    } else {
      res.status(400).json({message: 'Participant is Not Available'})
    }
  }
  static seeTournamentList(req, res, next) {
    // pagination
    // search pake regex
    // const tournament= await Tournament.find()
    // res.json({ tournament})
  }

  static seeTournamentDetail(req, res, next) {
    // const tournament= await Tournament.findbyid(_id)
    // const tournamentrules =await TournamentRules.findbyid(tournament._tournamentRulesId)
    // res.json({ tournament, tournamentrules})
  }

  static async seeHallOfFame(req, res, next) {
    // const FFA:any = await Tournament.find({finished:true, tournamentType:'freeforall'})
    // const BRANCHES:any = await Tournament.find({finished:true, tournamentType:'branches'})
    // if(FFA){
    //   // for looping berdasarkan FFA.length
    //   const rank: any = await TournamentReport.find({
    //     _tournamentId: FFA[i]._id,
    //   });
    //   const result = Math.max(rank.stageName);
    //   const winner:any=await TournamentReport.find({stageName:result})
    //   const sort= winner.participant[i].score
    //   res.status(201).json({ result:sort.sort() });
    // }else if (BRANCHES) {
    //   // looping berdasarkan BRANCHES.length
    //   const rank: any = await TournamentReport.findOne({
    //     _tournamentId: BRANCHES._id,
    //   });
    //   const result = Math.max(rank.stageName);
    //   const winner: any = await TournamentReport.find({ stageName: result });
    //   const sort = winner.participant[i].score;
    //   res.status(201).json({ result: sort.sort() });
    // }
  }
}

export default UserController;
