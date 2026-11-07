import { z } from "zod";
import "dotenv/config";


const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string(),
});


const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:");
  console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
  process.exit(1);
}

export const env = result.data;