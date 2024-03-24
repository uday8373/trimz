import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    trimzLink: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    socialLinks: {
      type: Array,
      required: false,
    },
    backgroundColor: {
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
