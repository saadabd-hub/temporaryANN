import * as mongoose from "mongoose";

export interface Iinbox extends mongoose.Document {
  _userId: any;
  notifications: [
    {
      messages: any;
      sent: Date;
      sender: any;
    }
  ];
}
