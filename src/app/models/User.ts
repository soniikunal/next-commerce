import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // role: "user" | "admin";
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
