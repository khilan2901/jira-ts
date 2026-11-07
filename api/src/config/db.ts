import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  // TODO 1: call mongoose.connect(env.MONGO_URI) with await

  try{
        await mongoose.connect(env.MONGO_URI);
  // TODO 2: console.log("MongoDB connected")
       console.log("Mongodb connected"); 
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
  

  // TODO 3: wrap it in try/catch. In catch, console.error the error
  //         and call process.exit(1)


}