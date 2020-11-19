import bcrypt from "bcrypt";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";

class UserController {
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

    const user = new User({
      username,
      email,
      phoneNumber,
      password,
      birthDate,
      fullname,
      subdistrict,
      tournament,
      role,
      picture,
    });

    user
      .save()
      .then((user) => {
        return res.status(201).json({
          success: true,
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
}

export default UserController;
