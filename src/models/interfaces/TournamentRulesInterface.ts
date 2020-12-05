import * as mongoose from "mongoose";

export default interface ITournamentRules extends mongoose.Document {
  rulesName: string;
  age: number;
  subdistrict: string;
  minParticipant: number;
  maxParticipant: number;
}
