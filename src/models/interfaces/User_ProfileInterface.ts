import * as mongoose from "mongoose";

export default interface IUserProfile extends mongoose.Document {
  _userId: any;
  _tournamentId: any;
  _groupId: any;
  birthDate: Date;
  subDistrict: String;
  phoneNumber: String;
  fullname: String;
}
