const Report = require("../models/Report");
const { validationResult } = require("express-validator");

exports.createReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newReport = new Report({
      ...req.body,
      photo: req.file ? req.file.path : undefined,
    });
    const savedReport = await newReport.save();
    req.app.get("io").emit("newReport", savedReport);
    res.status(201).json(savedReport);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating report", error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching report", error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { ...req.body, photo: req.file ? req.file.path : undefined },
      { new: true, runValidators: true }
    );
    if (!updatedReport)
      return res.status(404).json({ message: "Report not found" });
    req.app.get("io").emit("reportUpdated", updatedReport);
    res.json(updatedReport);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating report", error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport)
      return res.status(404).json({ message: "Report not found" });
    req.app.get("io").emit("reportDeleted", req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
};
