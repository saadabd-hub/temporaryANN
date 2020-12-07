import User from "../models/UserModel";
import Inbox from "../models/InboxModel";
import Tournament from "../models/TournamentModel";

class unregistered {
  static async SubmitTournament(req, res, next) {
    const { message, _CommitteeId } = req.body;
    const inboxes: any = await Inbox.findOne({
      _userId: _CommitteeId,
    });
    const tournament: any = await Tournament.findOne({
      tournamentName: message
    });
    const group = await Tournament.findOne({ groupEntry: false })
    if (inboxes == null || inboxes) {
      const sender = await Inbox.findOne({ _senderId: req.params.id });
      const entry = await Inbox.find({ _senderId: req.params.id, message });
      if (sender && entry.length != 0) {
        res.send("Already submitted");
        console.log("ajods")
      } else {
        if (!tournament) {
          res.send("Tournament not found");
        } else {
          if (!group) {
            res.send("Tournament must be a group")
          }
          else {
            next()
          }
        }
      }
    } else {
      res.send("This user not a Committee who can issued your participation");
    }
  }

  static async sendSubmission(req, res, next) {
    const { message, _CommitteeId } = req.body;
    const newinbox = await new Inbox({
      _userId: _CommitteeId,
      _senderId: req.params.id,
      message,
    });
    newinbox.save();
    return res.status(201).json({
      success: true,
      message: `your proposal is submitted for ${message} to committe, stay tune until further announcement`,
    });
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
      res.send("no new message");
    }
  }

  static async SeeInbox(req, res, next) {
    const inbox: any = await Inbox.find({ _userId: req.params.id });
    // const dota = await Inbox.find({ message: "dota", _userId: req.params.id });
    // console.log(dota.length);

    res.status(201).json({ data: inbox });
    return Inbox.updateMany(
      { _userId: req.params.id },
      { $set: { read: true } }
    );
  }
}

export default unregistered;
