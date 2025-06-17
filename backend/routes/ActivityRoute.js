const express = require("express");
const router = express.Router();
const Activities = require("../schemas/ActivitySchema");
router.get("/activityList", async (req, res) => {
  try {
    const activityList = await Activities.find();
    const count = activityList.length;
    res.status(200).json({
      count: count,
      activityList: activityList,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: err.message,
    });
  }
});
router.post("/addActivity", async (req, res) => {
  try {
    const { activityName, endingDate, startingDate, headName, description } =
      req.body;
    if (!activityName || !endingDate || !startingDate || !headName) {
      return res.status(400).json({
        status: "FAIL",
        message: "Missing required fields",
      });
    }
    const newActivity = new Activities({
      activityName,
      endingDate,
      startingDate,
      headName,
      description,
    });
    await newActivity.save();
    res.status(201).json({
      status: "PASS",
      message: "Exam added successfully",
      data: newActivity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "FAIL",
      message: "Server error during exam creation",
      error: err.message,
    });
  }
});
module.exports = router;
