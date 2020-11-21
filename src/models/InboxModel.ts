import * as mongoose from "mongoose";
import { Iinbox } from "../models/interfaces/InboxModelInterface";

const inboxSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notifications: [
    {
      messages: String,
      sent: { type: Date, default: Date.now() },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Inbox = mongoose.model<Iinbox>("inbox", inboxSchema);
export default Inbox;
