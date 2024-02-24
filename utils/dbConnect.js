// utils/dbConnect.js

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  // console.log("Connection", connection.isConnected);
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      "mongodb+srv://shadab:shadab2000@trimo.7xivtjo.mongodb.net/trimo"
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
}

export default dbConnect;
