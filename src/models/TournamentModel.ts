import * as mongoose from "mongoose";
import Itournament from "../models/interfaces/TournamentInterface";

const tournamentSchema = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  groupEntry: { type: Boolean, required: true },
  finished: { type: Boolean, default: false },
  tournamentOpen: Date,
  tournamentStart: Date,
  tournamentClose: Date,
  tournamentType: { type: String, required: true, lowercase: true },
  _tournamentRulesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rules",
    required: true,
  },
  _tournamentReportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
  },
  // stageName: {
  //   type: String,
  //   default: "participantList",
  // },
  stageName: {
    type: Number,
    default: 0,
  },
  tournamentPict: { type: String },
});

const Tournament = mongoose.model<Itournament>("Tournament", tournamentSchema);
export default Tournament;
