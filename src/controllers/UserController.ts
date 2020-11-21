import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import jwt from "jsonwebtoken";
import env from "../env.config";

class UserController {
  // static signup(req, res, next) {
  //   const {
  //     username,
  //     email,
  //     phoneNumber,
  //     password,
  //     birthDate,
  //     fullname,
  //     subdistrict,
  //     tournament,
  //     role,
  //   } = req.body;

  //   const picture = req.file.path;

  //   const user = new User({
  //     username,
  //     email,
  //     phoneNumber,
  //     password,
  //     birthDate,
  //     fullname,
  //     subdistrict,
  //     tournament,
  //     role,
  //     picture,
  //   });

  //   user
  //     .save()
  //     .then((user) => {
  //       return res.status(201).json({
  //         success: true,
  //         data: user,
  //       });
  //     })
  //     .then(() => {
  //       const userInbox = new Inbox({
  //         _userId: user._id,
  //       });
  //       return userInbox.save();
  //     })
  //     .catch(next);
  // }

  static signup(req, res, next) {
    const {
      username,
      email,
      phoneNumber,
      password,
      birthDate,
      fullname,
      subdistrict,
      tournament,
      role,
    } = req.body;

    const picture = req.file.path;

    User.findOne({ $and: [{ username }, { email }, { phoneNumber }] }).exec(
      (err, user) => {
        if (user) {
          throw { name: "ALREADY_EXIST" };
        } else next();
      }
    );
  }

  static activate(req, res, next) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      birthDate: req.body.birthDate,
      fullname: req.body.fullname,
      subdistrict: req.body.subdistrict,
      tournament: req.body.tournament,
      role: req.body.role,
      picture: req.file.path,
    });
    const { token } = req.body;

    if (token) {
      jwt.verify(token, env.JWT_Activate, function (err, decodedToken) {
        if (err) {
          throw { name: "EXPIRED" };
        }
        const {
          username,
          email,
          phoneNumber,
          password,
          birthDate,
          fullname,
          subdistrict,
          tournament,
          picture,
          role,
        } = decodedToken;

        User.findOne({ $and: [{ username }, { email }, { phoneNumber }] })
          .exec((err, user) => {
            if (user) {
              throw { name: "ALREADY_EXIST" };
            } else next();
          })
          .then((user: any) => {
            user
              .save()
              .then((user) => {
                return res.status(201).json({
                  success: true,
                  data: user,
                });
              })
              .then(() => {
                const userInbox = new Inbox({
                  _userId: user?._id,
                });
                return userInbox.save();
              })
              .catch(next);
          });
      });
    } else throw { name: "INVALID_TOKEN" };
  }

  // static activate(req, res, next) {
  //   const user = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     phoneNumber: req.body.phoneNumber,
  //     password: req.body.password,
  //     birthDate: req.body.birthDate,
  //     fullname: req.body.fullname,
  //     subdistrict: req.body.subdistrict,
  //     tournament: req.body.tournament,
  //     role: req.body.role,
  //     picture: req.file.path,
  //   });
  //   const { token } = req.body;
  //   if (token) {
  //     jwt.verify(token, env.JWT_Activate, function (err, decodedToken) {
  //       if (err) {
  //         throw { name: "EXPIRED" };
  //       } else next();
  //     });
  //     user
  //       .save()
  //       .then((user) => {
  //         return res.status(201).json({
  //           success: true,
  //           data: user,
  //         });
  //       })
  //       .then(() => {
  //         const userInbox = new Inbox({
  //           _userId: user._id,
  //         });
  //         return userInbox.save();
  //       })
  //       .catch(next);
  //   }
  // }

  static signin(req, res, next) {
    const { email, username, password } = req.body;
    User.findOne({ $or: [{ email }, { username }] })
      .then((user) => {
        if (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            const access_token = jwt.sign({ _id: user._id }, "ANNjaya");
            res.status(201).json({
              success: true,
              access_token,
              user: [
                {
                  email: user.email,
                  username: user.username,
                  picture: user.picture,
                  tournament: user.tournament,
                  subdistrict: user.subdistrict,
                },
              ],
            });
          } else throw { name: "NOT_FOUND" };
        } else throw { name: "NOT_FOUND" };
      })
      .catch(next);
  }

  static userlist(req, res, next) {
    User.find().then((user) => {
      res.json({ user });
    });
  }
}

export default UserController;
