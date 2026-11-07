->day 1

i learned zod which does schema validation stuff like this in here we are validating if env ports,uri exists or not using zod 

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

->day 2

monogodb stuff connected to mongodb using  mongooes like this and made userschma model in user.ts

try{
        await mongoose.connect(env.MONGO_URI);
  // TODO 2: console.log("MongoDB connected")
       console.log("Mongodb connected"); 
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }