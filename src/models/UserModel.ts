import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./interfaces/UserModelInterface";

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    fullname: { type: String, required: true },
    subdistrict: { type: String, required: true },
    tournament: { type: String, default: "not participated yet" },
    role: { type: String, default: "user", enum: ["admin", "HeadChief", "Comittee", "user"] },
    picture: { type: String, required: true },
    resetLink: { data: String, default: "" },

  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", function (next) {
  User.findOne({
    $or: [
      { email: this.email },
      { username: this.username },
      { phoneNumber: this.phoneNumber },
    ],
  })
    .then((user) => {
      if (user) {
        throw { name: "ALREADY_EXIST" };
      } else {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
      }
    })
    .catch(next);
});

const User = mongoose.model<IUser>("user", userSchema);
export default User;
