import * as mongoose from "mongoose";
import ItournamentReport from "./interfaces/TournamentReportInterface";

const tournamentReportSchema = new mongoose.Schema({
  _groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: Number,
  _tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  stageName: {
    type: String,
    enum: [
      "participantList",
      "shuffling",
      "64Elimination",
      "32Elimination",
      "16Elimination",
      "8Elimination",
      "semifinal",
      "third",
      "final",
    ],
    default: "shuffle",
  },
});

const TournamentReport = mongoose.model<ItournamentReport>(
  "Result",
  tournamentReportSchema
);
export default TournamentReport;
