const express = require("express");
const router = express.Router();
const { submitReport } = require("../controllers/reportController");
const multer = require("multer");
const verifyToken = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

// Protect this route with JWT token
router.post("/reports", verifyToken, upload.single("photo"), submitReport);

module.exports = router;
