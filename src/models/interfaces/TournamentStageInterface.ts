import * as mongoose from "mongoose";

export default interface ITournamentStage extends mongoose.Document {
  _tournamentId: any;
  tournamentStage: [
    {
      stageName: String;
      matches: [
        {
          _tournamentResultId: any;
        }
      ];
    }
  ];
}
