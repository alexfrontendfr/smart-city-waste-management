const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  issueType: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: { type: String, default: "pending" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
