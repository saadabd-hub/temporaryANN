import * as mongoose from "mongoose";
import ItournamentStage from "./interfaces/TournamentStageInterface";

const tournamentStageSchema = new mongoose.Schema({
  _tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  tournamentStage: [
    {
      stageName: String,
      matches: [
        {
          _tournamentResultId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Result",
            required: true,
          },
        },
      ],
    },
  ],
});

const TournamentStage = mongoose.model<ItournamentStage>(
  "Stage",
  tournamentStageSchema
);
export default TournamentStage;
