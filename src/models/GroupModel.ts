import * as mongoose from "mongoose";
import Igroup from "../models/interfaces/GroupInterface";

const GroupSchema = new mongoose.Schema({
  _tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  member: [
    {
      _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  groupName: { type: String, required: true, unique: true },
});

const Group = mongoose.model<Igroup>("Group", GroupSchema);
export default Group;
