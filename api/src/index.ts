import express from "express";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

async function start() {
  await connectDB();
  app.listen(env.PORT, () => console.log(`Server running on ${env.PORT}`));
}

start();