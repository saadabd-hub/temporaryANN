import * as mongoose from "mongoose";

export default interface Iinbox extends mongoose.Document {
  _userId: any;
  _senderId: any;
  read: Boolean;
  message: string;
  sent: string;
}
