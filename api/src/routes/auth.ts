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

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
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

router.post("/login", async (req, res) => {
  try {
   
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        issues: result.error.issues,
      });
    }

    const { email, password } = result.data;

   
    const user = await User.findOne({ email }).select("+password");

   
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  
    const userId = user._id;

    return res.status(200).json({
      message: "Login successful",
      userId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


export default router;