import * as mongoose from "mongoose";

export default interface ITournament extends mongoose.Document {
  tournamentName: string;
  finished: boolean;
  groupEntry: boolean;
  tournamentOpen: Date;
  tournamentStart: Date;
  tournamentClose: Date;
  tournamentType: string;
  _tournamentRulesId: any;
}
