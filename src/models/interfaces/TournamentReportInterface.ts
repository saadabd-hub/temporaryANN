import * as mongoose from "mongoose";

export default interface ITournamentReport extends mongoose.Document {
  participant: [{ _groupId: any; _userId: any; score: Number }];
  _tournamentId: any;
  stageName: string;
}
