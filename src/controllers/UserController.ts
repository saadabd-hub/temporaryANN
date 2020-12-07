import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import UserProfile from "../models/User_ProfileModel";
import _ from "lodash";
import IUser from "../models/interfaces/UserInterface";
require("dotenv").config();

class UserController {
  static Signup(req, res, next) {
    const {
      username,
      email,
      password,
      role,
    } = req.body;


    const user = new User({
      username,
      email,
      password,
      role: role || "user"
    });

    user
      .save()
      .then((user) => {
        if (!user) {
          next(new Error)
        }
        else next()
        res.status(201).json({
          success: true,
          message: `Only one few step, a Verification code sent to ${req.body.email
            } on ${Date()}`,
          data: {
            username: username,
            email: email,
          }
        });
      })
      .catch(next);
  }


  static async signin(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const user = await User.findOne({ $or: [{ email }, { username }] });
      if (!user) return next({ name: "LOGIN_FAIL" });
      const validPassword = await bcrypt.compareSync(password, user.password);
      if (!validPassword) return next({ name: "NOT_FOUND" })
      const secret_key = <string>process.env.JWT_Accesstoken

      const access_token = jwt.sign({ _id: user._id }, secret_key, { expiresIn: '1d' });
      await User.findByIdAndUpdate(user._id, { access_token })
      res.status(200).json({
        data: { email: user.email, role: user.role },
        access_token,
        msg: "logged in successfully"
      })
    } catch (error) {
      next(error);
    }
  }

  static proceed_signin(req, res, next) {
    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    })
      .then((user) => {
        if (user) {
          const jwtActive: any = process.env.JWT_Activate;
          const { verifyingToken } = req.body;
          jwt.verify(verifyingToken, jwtActive, (err, decoded) => {
            if (err) {
              console.log(jwtActive)
              next({ name: "CODE_NOT_RECOGNIZE" });
            } else {
              next();
            }
          });
        } else next();
      })
      .catch(next);
  }
  static forgotPassword(req, res, next) {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        console.log("masuk error", err);
        throw { name: "USER_NOT_FOUND" };
        next();
      } else {
        console.log("masuk else");
        next();
      }
    });
  }

  static resetPassword(req, res, next) {
    const { resetLink, newPassword } = req.body;
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
                    res.status(200).json({
                      success: true,
                      message: `Password successfully changed`,
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
