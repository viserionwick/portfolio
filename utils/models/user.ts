// Imports
import { DefaultSession } from "next-auth";
import { Schema, model, models } from "mongoose";

// Exports
export interface IUser {
  _id?: string;
  role: string;
  fullName: string;
  email: string;
  username: string;
}

export interface ISessionUser extends DefaultSession {
  user?: IUser
}

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required."],
    minLength: [1, "Full name should be at least 1 characters long."],
    maxLength: [30, "Full name should be less than 30 characters."],
    match: [
      /\S+/g,
      "Invalid full name.",
    ]
  },
  role: {
    type: String,
    required: [true, "Role is required."]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address.",
    ],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Invalid username. Username can only contain letters, numbers, and underscores.",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
