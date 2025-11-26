import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (!mongoURI) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    const connectionInstance = await mongoose.connect(`${mongoURI}/${DB_NAME}`);

    console.log(`🚀 Database connected at: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection FAILED:", error.message);
    process.exit(1);
  }
};

export default connectDB;
