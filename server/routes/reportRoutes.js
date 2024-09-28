const express = require("express");
const router = express.Router();
const {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.post("/reports", createReport);
router.get("/reports", getReports);
router.get("/reports/:id", getReport);
router.put("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

module.exports = router;
