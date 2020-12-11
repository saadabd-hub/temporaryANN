import * as mongoose from "mongoose";
import Iinbox from "./interfaces/InboxInterface";

const inboxSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  read: { type: Boolean, default: false },
  _senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: [String],
  sent: { type: Date, default: Date.now() },
});

const Inbox = mongoose.model<Iinbox>("Inbox", inboxSchema);
export default Inbox;
