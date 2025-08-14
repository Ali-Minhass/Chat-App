import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(error, "Mongoose connection error");
    process.exit(1);
  }
};

export default connectDB;
