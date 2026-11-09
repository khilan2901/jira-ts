import express from "express";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";


const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

async function start() {
  await connectDB();
  app.listen(env.PORT, () => console.log(`Server running on ${env.PORT}`));
}

start();