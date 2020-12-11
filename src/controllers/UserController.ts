import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
// const bcrypt = require("bcrypt");
import User from "../models/UserModel";
import UserProfile from "../models/User_ProfileModel";
import _ from "lodash";
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
        // res.send("to next atas");
      } else {
        const secret: any = process.env.JWT_Activate;
        jwt.verify(verifyingToken, secret, (err, decoded) => {
          if (err) {
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
            // res.send("updated and next");
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
        if (error) {
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
}

export default UserController;
