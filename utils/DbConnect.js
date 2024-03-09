// utils/dbConnect.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = {};

async function DbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const mongoURL = process.env.MONGODB_URI;
    const db = await mongoose.connect(mongoURL);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
}

export default DbConnect;
