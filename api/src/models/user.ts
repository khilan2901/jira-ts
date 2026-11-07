import { Schema, model } from "mongoose";

// TODO 6: create a userSchema with:
//   email    (String, required, unique, lowercase)
//   password (String, required)
//   name     (String, required)
// Add { timestamps: true } as the second argument to new Schema()


const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true });

// TODO 7: export const User = model("User", userSchema);
export const user = model("user",userSchema);