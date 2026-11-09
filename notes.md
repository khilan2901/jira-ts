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

  day 3 -->

we use bcrypt for hashing password  
const hashed = await bcrypt.hash(password, 10) 
we made register auth route for registering user by name,email,password 
if email alredy exist responce 409 
 like this 

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
