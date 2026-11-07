import express from "express";
import { env } from "./config/env.js"
import { connectDB } from "./config/db.js";

connectDB();

const app = express();

app.get("/api/health", (req: express.Request, res: express.Response) => {
  res.json({ ok: true });
});

app.listen(env.PORT, () => console.log(`Server running on ${env.PORT}`));
