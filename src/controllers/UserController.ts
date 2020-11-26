import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import jwt from "jsonwebtoken";
import env from "../env.config";
import roles from "../helper/roles";
import envConfig from "../env.config";


class UserController {
  static grantacsess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action"
          });
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  }
  static async allowifloggedin(req, res, next) {
    try {
      const user = res.locals.loggedInUser;

      if (!user) {
        console.log(user);

        return res.status(401).json({
          error: "You need to be logged in to access this route"
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
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

  static async temporarySignup(req, res, next) {
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
      role: role || "user",
    });
    user.save()
      .then((user) => {
        return res.status(201).json({
          success: true,
          message: `Only one few step, a Verification code sent to ${req.body.email
            } on ${Date()}`,
          data: user,
        });
      })
      .catch(next);
  }

  // static signin(req, res, next) {
  //   const { email, username, password } = req.body;
  //   User.findOne({ $or: [{ email }, { username }] })
  //     .then((user) => {
  //       if (user) {
  //         if (user?.role > 0 && bcrypt.compareSync(password, user.password)) {
  //           next();
  //         } else if (
  //           user?.role === 0 &&
  //           bcrypt.compareSync(password, user.password)
  //         ) {
  //           next();
  //         } else throw { name: "LOGIN_FAIL" };
  //       } else throw { name: "NOT_FOUND" };
  //     })
  //     .catch(next);
  // }

  static async login(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const user = await User.findOne({ $or: [{ email }, { username }] });
      if (!user) return next({ name: "LOGIN_FAIL" });
      const validPassword = await bcrypt.compareSync(password, user.password);
      if (!validPassword) return next({ name: "NOT_FOUND" })
      const secret_key = <string>process.env.JWT_SECRET

      const access_token = jwt.sign({ _id: user._id }, secret_key, { expiresIn: '1h' });
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
  static getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      data: users
    });
  }


  static proceed_signin(req, res, next) {
    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    })
      .then((user) => {
        if (user?.role === "user") {
          if (req.body.verifyToken) {
            const userInbox = new Inbox({ _userId: user?._id });
            userInbox
              .save()
          } else throw { name: "EXPIRED" };
        } else next();
      })
      .catch(next);
  }

  // static signedin(req, res, next) {
  //   User.findOne({ email: req.body.email })
  //     .then((user) => {
  //       const access_token = jwt.sign({ _id: user?._id }, "ANNjaya");
  //       res.status(201).json({
  //         success: true,
  //         access_token,
  //         user: [
  //           {
  //             email: user?.email,
  //             username: user?.username,
  //             picture: user?.picture,
  //             tournament: user?.tournament,
  //             subdistrict: user?.subdistrict,
  //           },
  //         ],
  //       });
  //     })
  //     .catch(next);
  // }

  // static userlist(req, res, next) {
  //   User.find().then((user) => {
  //     res.json({ user });
  //   });
  // }
}

export default UserController;
