import mongoose from "mongoose";

interface iAuth {
  name: string;
  email: string;
  address: string;
  password: string;
  avatar: string;
  avatarID: string;
}

export interface iAuthData extends iAuth, mongoose.Document {};

const authSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    password: { type: String },
    avatar: { type: String },
    avatarID: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<iAuthData>("auth", authSchema);
