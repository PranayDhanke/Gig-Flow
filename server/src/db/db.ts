import mongoose from "mongoose";
import dotenv, { configDotenv } from "dotenv";

configDotenv();

const mongo_uri = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    console.log(`Connecting to Database...`);
    await mongoose.connect(mongo_uri);
    console.log(`Database connection successful `);
  } catch (error) {
    console.log(`Database connection error : ${error}`);
    process.exit(0);
  }
};

export { connectToDatabase };
