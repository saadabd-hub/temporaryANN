import User from "../models/UserModel";
import Inbox from "../models/InboxModel";

class userTodo {
  static seeProfile(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json({
            user: [
              {
                email: user?.email,
                username: user?.username,
                picture: user?.picture,
                fullname: user?.fullname,
                phoneNumber: user?.phoneNumber,
                birthDate: user?.birthDate.toDateString(),
                tournament: user?.tournament,
                subdistrict: user?.subdistrict,
              },
            ],
          });
        } else throw { name: "NOT_FOUND" };
      })
      .catch(next);
  }

  static changeProfile(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        if (user && user.fullname != req.body.fullname) {
          return User.findOneAndUpdate(
            { _id: req._id },
            { fullname: req.body.fullname }
          ).then((user) => {
            res.status(200).json({
              message: `successfuly renamed to ${req.body.fullname}`,
            });
          });
        } else throw { name: "ALREADY_RENAMED" };
      })
      .catch(next);
  }

  static seeInbox(req, res, next) {
    Inbox.findOne({ _userId: req.params.id })
      .then((inbox) => {
        if (inbox) {
          if (inbox?.notifications.length < 1) {
            res.send("no message yet");
          } else {
            res.status(200).send("resultInbox");
          }
        }
      })
      .catch(next);
  }
}

export default userTodo;
