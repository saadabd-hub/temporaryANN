import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import jwt from "jsonwebtoken";
import env from "../env.config";

class UserController {
  static signup(req, res, next) {
    const { username, email, phoneNumber } = req.body;

    const picture = req.file.path;

    User.findOne({ $and: [{ username }, { email }, { phoneNumber }] })
      .then((user) => {
        if (user == null) {
          next();
        } else {
          throw { name: "ALREADY_EXIST" };
        }
      })
      .catch(next);
  }

  static temporarySignup(req, res, next) {
    const {
      username,
      email,
      phoneNumber,
      password,
      birthDate,
      fullname,
      subdistrict,
      role,
    } = req.body;

    const picture = req.file.path;

    const user = new User({
      username,
      email,
      phoneNumber,
      password,
      birthDate,
      fullname,
      subdistrict,
      picture,
      role,
    });

    user
      .save()
      .then((user) => {
        return res.status(201).json({
          success: true,
          message: `Only one few step, a Verification code sent to ${
            req.body.email
          } on ${Date()}`,
          data: user,
        });
      })
      .catch(next);
  }

  static signin(req, res, next) {
    const { email, username, password } = req.body;
    User.findOne({ $or: [{ email }, { username }] })
      .then((user) => {
        if (user) {
          if (user?.role > 0 && bcrypt.compareSync(password, user.password)) {
            next();
          } else if (
            user?.role === 0 &&
            bcrypt.compareSync(password, user.password)
          ) {
            next();
          } else throw { name: "LOGIN_FAIL" };
        } else throw { name: "NOT_FOUND" };
      })
      .catch(next);
  }

  static proceed_signin(req, res, next) {
    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    })
      .then((user) => {
        if (user?.role === 0) {
          if (req.body.verifyToken === 12345) {
            const userInbox = new Inbox({ _userId: user?._id });
            userInbox
              .save()
              .then(() =>
                User.findOneAndUpdate(
                  { email: req.body.email },
                  { $set: { role: 5 } }
                )
              );
            next();
          } else throw { name: "EXPIRED" };
        } else next();
      })
      .catch(next);
  }

  static signedin(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        const access_token = jwt.sign({ _id: user?._id }, "ANNjaya");
        res.status(201).json({
          success: true,
          access_token,
          user: [
            {
              email: user?.email,
              username: user?.username,
              picture: user?.picture,
              tournament: user?.tournament,
              subdistrict: user?.subdistrict,
            },
          ],
        });
      })
      .catch(next);
  }

  // static userlist(req, res, next) {
  //   User.find().then((user) => {
  //     res.json({ user });
  //   });
  // }
}

export default UserController;
