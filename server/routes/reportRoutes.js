const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");
const {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const reportValidation = [
  body("category")
    .notEmpty()
    .isIn([
      "Overflowing Bin",
      "Illegal Dumping",
      "Missed Collection",
      "Damaged Bin",
      "Other",
    ]),
  body("priority").notEmpty().isIn(["Low", "Medium", "High", "Urgent"]),
  body("description").notEmpty().isString().isLength({ max: 1000 }),
  body("location").notEmpty().isObject(),
  body("location.type").equals("Point"),
  body("location.coordinates").isArray().isLength({ min: 2, max: 2 }),
  body("location.coordinates.*").isFloat(),
];

router.post(
  "/reports",
  authMiddleware,
  upload.single("photo"),
  reportValidation,
  createReport
);
router.get("/reports", getReports);
router.get("/reports/:id", getReport);
router.put(
  "/reports/:id",
  authMiddleware,
  upload.single("photo"),
  reportValidation,
  updateReport
);
router.delete("/reports/:id", authMiddleware, deleteReport);

module.exports = router;
