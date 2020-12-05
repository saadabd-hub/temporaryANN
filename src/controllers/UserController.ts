import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import UserProfile from "../models/User_ProfileModel";
import _ from "lodash";
import * as dotenv from "dotenv";
import IUser from "../models/interfaces/UserInterface";
require("dotenv").config();

class UserController {
  static signup(req, res, next) {
    const { username, email, password, phoneNumber } = req.body;

    UserProfile.findOne({ phoneNumber })
      .then((profile) => {
        if (profile) {
          throw { name: "ALREADY_EXIST" };
        } else {
          const newuser = new User({ username, email, password });
          newuser
            .save()
            .then(() => {
              next();
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  static init(req, res, next) {
    const { email, birthDate, subDistrict, phoneNumber } = req.body;

    User.findOne({ email })
      .then((user) => {
        const newprofile = new UserProfile({
          birthDate,
          subDistrict,
          phoneNumber,
          _userId: user?._id,
        });
        // const newinbox = new Inbox({ _userId: user?._id });
        newprofile.save();
        // newinbox.save();
      })
      .then((user: any) => {
        res.json({
          success: true,
          message: `${req.body.email}'s has successfully created`,
        });
      })
      .catch(next);
  }

  static signin(req, res, next) {
    const { email, username, password } = req.body;
    User.findOne({ $or: [{ email }, { username }] })
      .then((user) => {
        if (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
              success: true,
              access_token: jwt.sign({ _id: user?._id }, "signin"),
            });
          } else throw { name: "LOGIN_FAIL" };
        } else throw { name: "LOGIN_FAIL" };
      })
      .catch(next);
  }
}

export default UserController;
