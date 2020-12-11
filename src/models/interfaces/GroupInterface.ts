import * as mongoose from "mongoose";

export default interface Igroup extends mongoose.Document {
  _tournamentId: any;
  member: [
    {
      _userId: any;
    }
  ];
  groupName: string;
  age: number;
  subDistrict: string;
  groupPict: string;
}
