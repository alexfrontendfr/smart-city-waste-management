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
      maxlength: 1000,
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
        validate: {
          validator: function (v) {
            return (
              v.length === 2 &&
              v[0] >= -180 &&
              v[0] <= 180 &&
              v[1] >= -90 &&
              v[1] <= 90
            );
          },
          message: (props) => `${props.value} is not a valid location!`,
        },
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
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
    },
    notes: [
      {
        text: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);
