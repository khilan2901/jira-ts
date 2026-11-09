import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "../models/user.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

router.post("/register", async (req, res) => {

   const result = registerSchema.safeParse(req.body);
  
      if (!result.success) {
        return res.status(400).json({
          message: "Invalid request data",
          issues: result.error.issues,
        });
      }
  const {name,email,password} = result.data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const hashed = await bcrypt.hash(password, 10)

   const user = await User.create({ name, email, password: hashed })

  res.status(201).json({id: user._id, name: user.name, email: user.email});
});

export default router;