import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import Tournament from "../models/TournamentModel";
import Group from "../models/GroupModel";
import UserProfile from "../models/User_ProfileModel";

class unregistered {
  static async SubmitTournament(req, res, next) {
    const { message, _CommitteeId } = req.body;
    const inboxes: any = await Inbox.findOne({
      _userId: _CommitteeId,
    });
    const tournament: any = await Tournament.findOne({
      tournamentName: message,
    });
    const Committee: any = await User.findById({ _id: _CommitteeId });
    const group: any = await Tournament.findOne({ tournamentName: message });
    if (Committee) {
      if (inboxes == null || inboxes) {
        const sender = await Inbox.findOne({ _senderId: req.params.id });
        const entry = await Inbox.find({ _senderId: req.params.id, message });
        if (sender && entry.length != 0) {
          next({ name: "ALREADY_SUBMITTED" });
        } else {
          if (!tournament) {
            next({ name: "TOURNAMENT_NOT_FOUND" });
          } else {
            if (group.groupEntry == false) {
              next();
            } else {
              next({ name: "GROUP_NEEDED" });
            }
          }
        }
      } else {
        next({ name: "NOT_AUTHORIZE" });
      }
    } else {
      next({ name: "NOT_AUTHORIZE" });
    }
  }

  static async SubmitTournamentAsGroup(req, res, next) {
    const { message, _CommitteeId } = req.body;
    const inboxes: any = await Inbox.findOne({
      _userId: _CommitteeId,
    });
    const tournament: any = await Tournament.findOne({
      tournamentName: message[0],
    });
    const Committee: any = await User.findById({ _id: _CommitteeId });
    const group: any = await Tournament.findOne({ tournamentName: message });
    if (Committee) {
      if (inboxes == null || inboxes) {
        const sender = await Inbox.findOne({ _senderId: req.params.id });
        const entry = await Inbox.find({ _senderId: req.params.id, message });
        if (sender && entry.length != 0) {
          next({ name: "ALREADY_SUBMITTED" });
        } else {
          if (!tournament) {
            next({ name: "TOURNAMENT_NOT_FOUND" });
          } else {
            if (group.groupEntry == false) {
              next({ name: "INDIVIDUAL_NEEDED" });
            } else {
              next();
            }
          }
        }
      } else {
        next({ name: "NOT_AUTHORIZE" });
      }
    } else {
      next({ name: "NOT_AUTHORIZE" });
    }
  }

  static async sendSubmission(req, res, next) {
    const { message, _CommitteeId } = req.body;
    const tournament: any = await Tournament.findOne({
      $or: [{ tournamentName: message }, { tournamentName: message[0] }],
    });
    const newinbox = await new Inbox({
      _userId: _CommitteeId,
      _senderId: req.params.id,
      message,
    });
    newinbox.save();

    if (tournament.groupEntry === false) {
      return res.status(201).json({
        success: true,
        message: `your proposal is submitted for ${message} to committe, stay tune until further announcement`,
      });
    } else {
      return res.status(201).json({
        success: true,
        message: `your proposal on behalf of ${message[1]} is submitted for ${message[0]} to committe, stay tune until further announcement`,
      });
    }
  }

  static async notifications(req, res, next) {
    const notification: any = await Inbox.find({
      _userId: req.params.id,
      read: false,
    });
    if (notification.length > 0) {
      await res.status(201).json({
        message: `You've got ${notification.length} new messages`,
        data: notification,
      });
      return Inbox.findOneAndUpdate(
        { _userId: req.params.id, read: false },
        { read: true }
      );
    } else {
      res.status(201).json({ success: true, message: "no new message" });
    }
  }

  static async SeeInbox(req, res, next) {
    const inbox: any = await Inbox.find({ _userId: req.params.id });

    if (inbox.length == 0) {
      res.status(201).json({ success: true, message: "Inbox is empty" });
    } else {
      res.status(201).json({ data: inbox });
      return Inbox.updateMany(
        { _userId: req.params.id },
        { $set: { read: true } }
      );
    }
  }

  static async createGroup(req, res, next) {
    const { groupName, age, subDistrict } = req.body;

    const myself: any = await UserProfile.findOne({ _userId: req.params.id });
    const group: any = await Group.findOne({ groupName });
    if (myself._groupId == null || undefined) {
      if (!group) {
        const birthdate: any = myself.birthDate.valueOf();
        const datenow = Date.now();
        const age = Math.floor((datenow - birthdate) / 31536000000);
        const subDistrict = myself.subDistrict;
        const users: any = [{ _userId: req.params.id }];

        const groups = await new Group({
          member: users,
          groupName,
          age,
          subDistrict,
        });
        groups.save();

        // await Group.findOneAndUpdate(
        //   { groupName },
        //   { $push: { member: users } }
        // );

        res.send("kebikin");
      } else {
        res.send("udah ada");
      }
    } else {
      res.send("lo udah punya group");
    }
  }

  static async groupRecruit(req, res, next) {
    const { member, groupName, age, subDistrict } = req.body;

    const user: any = await UserProfile.findOne({ _userId: member[0]._userId });
    const myself: any = await UserProfile.findOne({
      _userId: req.params.id,
    });

    const birthdate: any = user.birthDate.valueOf();
    const datenow = Date.now();
    const userAge = Math.floor((datenow - birthdate) / 31536000000);

    if (user.subDistrict === myself.subDistrict) {
      if (user._tournamentId == null || undefined) {
        console.log(user.fullname, userAge);

        res.send("lanjut");
      } else {
        res.send("udah ikut lomba");
      }
    } else {
      res.send("beda subdistrict");
    }
  }
}

export default unregistered;
