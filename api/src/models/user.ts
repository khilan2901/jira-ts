import { Schema, model } from "mongoose";


const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true });

// TODO 7: export const User = model("User", userSchema);
export const User = model("User", userSchema);