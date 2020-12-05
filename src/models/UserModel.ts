import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import IUser from "./interfaces/UserInterface";

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "unregistered", lowercase: true },
    resetLink: { data: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", function (next) {
  User.findOne({
    $or: [{ email: this.email }, { username: this.username }],
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;
