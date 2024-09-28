const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Overflowing Bin",
        "Illegal Dumping",
        "Missed Collection",
        "Damaged Bin",
        "Other",
      ],
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Urgent"],
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    photo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);
