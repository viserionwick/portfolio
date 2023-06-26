import { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: string;
  role: string;
  fullName: string;
  email: string;
}

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minLength: [4, "Full name should be atleast 4 characters long"],
    maxLength: [30, "Full name should be less than 30 characters"],
  },
  role: {
    type: String,
    default: "editor",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
