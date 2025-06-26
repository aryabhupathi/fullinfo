const express = require("express");
const router = express.Router();
const NewAdmission = require("../schemas/StudentAdmissionSchema");
router.get("/students", async (req, res) => {
  try {
    const students = await NewAdmission.find();
    const count = students.length;
    res.status(200).json({ count: count, students: students });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
});
router.post("/newAdmission", async (req, res) => {
  try {
    const {
      studentName,
      dateofbirth,
      className,
      sectionName,
      dateofadmission,
      admissionSession,
      fatherName,
      mobileNumber,
      address,
    } = req.body;
    const requiredFields = {
      studentName,
      dateofbirth,
      className,
      sectionName,
      dateofadmission,
      admissionSession,
      fatherName,
      mobileNumber,
      address,
    };
    const missingFields = Object.entries(requiredFields).filter(
      ([key, value]) => !value
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "FAIL",
        message: `Missing fields: ${missingFields
          .map(([key]) => key)
          .join(", ")}`,
      });
    }
    const existingStudent = await NewAdmission.findOne({
      studentName,
      dateofbirth,
    });
    if (existingStudent) {
      return res.status(409).json({
        status: "FAIL",
        message: "Student already exists",
      });
    }
    const admissionYear = new Date(dateofadmission).getFullYear();
    const baseRollPrefix = `${admissionYear}${className.toUpperCase()}${sectionName.toUpperCase()}`;
    const lastStudent = await NewAdmission.find({
      rollNumber: new RegExp(`^${baseRollPrefix}-\\d+`),
    })
      .sort({ rollNumber: -1 })
      .limit(1);
    let nextSeq = 1;
    if (lastStudent.length > 0) {
      const lastRoll = lastStudent[0].rollNumber;
      const parts = lastRoll.split("-");
      const seq = parseInt(parts[3], 10);
      if (!isNaN(seq)) {
        nextSeq = seq + 1;
      }
    }
    const rollNumber = `${baseRollPrefix}${String(nextSeq).padStart(3, "0")}`;
    const newStudent = new NewAdmission({
      ...req.body,
      rollNumber,
    });
    await newStudent.save();
    res.status(201).json({
      status: "PASS",
      message: "Admission successful",
      student: newStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "FAIL",
      message: "Failed to create admission",
      error: err.message,
    });
  }
});
module.exports = router;
