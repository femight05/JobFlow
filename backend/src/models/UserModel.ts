import mongoose from "mongoose";

import bcrypt from "bcrypt";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  applications: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
});

userSchema.pre("save", async function (this: IUser) {
  this.updateAt = new Date();
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
