import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    threads: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    xTwitter: {
      type: String,
      required: false,
    },
    tiktok: {
      type: String,
      required: false,
    },
    snapchat: {
      type: String,
      required: false,
    },
    discord: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    telegram: {
      type: String,
      required: false,
    },
    twitch: {
      type: String,
      required: false,
    },
    template: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
  },
);

export default mongoose.models.TrimzLink || mongoose.model("TrimzLink", LinkSchema);
