const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOneTime: {
      type: Boolean,
      required: true,
      default: false,
    },
    isIpAddress: {
      type: Boolean,
      required: true,
      default: false,
    },
    ipAddress: {
      type: String,
      required: false,
    },
    customUrl: {
      type: String,
      required: false,
    },
    userIp: {
      type: String,
      required: false,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clickDetails: [
      {
        browser: {
          type: String,
          required: true,
        },
        clickedAt: {
          type: Date,
          required: true,
          default: Date.now,
        },
        clickIp: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
  },
);

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
