import * as mongoose from "mongoose";

export default interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: any;
  role: string;
  resetLink: any;
}
