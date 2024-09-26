const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const http = require("http");
const socketio = require("socket.io"); // Socket.io for real-time updates

dotenv.config();

const reportRoutes = require("./routes/reportRoutes");
const connectDB = require("./config/db");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());

// Configure Multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  },
});
const upload = multer({ storage: storage });

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

app.use("/api", reportRoutes);

connectDB();

// Listen for new connections from clients
io.on("connection", (socket) => {
  console.log("New connection established");

  // Listen for new report submissions and broadcast it
  socket.on("reportSubmitted", (data) => {
    io.emit("newReport", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
