const submitReport = async (req, res) => {
  const { issueType, priority, location } = req.body;

  if (!issueType || !priority || !location) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }

  // Get Cloudinary URL for the uploaded image
  const photo = req.file ? req.file.path : null;

  try {
    const newReport = new Report({
      issueType,
      priority,
      location: JSON.parse(location),
      photo,
    });

    const savedReport = await newReport.save();
    req.io.emit("newReport", savedReport);
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
