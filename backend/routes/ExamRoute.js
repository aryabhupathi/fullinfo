const express = require("express");
const router = express.Router();
const Exams = require("../schemas/ExamSchema");
router.get("/examList", async (req, res) => {
  try {
    const examList = await Exams.find();
    const count = examList.length
    res.status(200).json({
      count:count,examList:examList,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch exams",
      error: err.message,
    });
  }
});
router.post("/addexam", async (req, res) => {
  try {
    const { stuClassName, examType, startingDate, examFee } = req.body;
    if (!stuClassName || !examType || !startingDate || examFee === undefined) {
      return res.status(400).json({
        status: "FAIL",
        message: "Missing required fields",
      });
    }
    const newExam = new Exams({
      stuClassName,
      examType,
      startingDate,
      examFee,
    });
    await newExam.save();
    res.status(201).json({
      status: "PASS",
      message: "Exam added successfully",
      data: newExam,
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
