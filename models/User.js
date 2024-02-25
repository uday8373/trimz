// models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
  },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
