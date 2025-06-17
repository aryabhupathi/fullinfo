const express = require("express");
const router = express.Router();
const NewAdmission = require("../schemas/StudentAdmissionSchema");
router.get("/students", async (req, res) => {
  try {
    const students = await NewAdmission.find();
    const count = students.length;
    res.status(200).json({count:count,students:students});
  } catch (err) {
    res.status(500)
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
      oldSchool,
      fatherName,
      motherName,
      mobileNumber,
      aadharNumber,
      religion,
      caste,
      parentOccupation,
      securityNumber,
      address,
    } = req.body;
    // Required fields validation
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
    // Check if student with same name and dob exists (customizable logic)
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
    // Save new student
    const newStudent = new NewAdmission({
      studentName,
      dateofbirth,
      className,
      sectionName,
      dateofadmission,
      admissionSession,
      oldSchool,
      fatherName,
      motherName,
      mobileNumber,
      aadharNumber,
      religion,
      caste,
      parentOccupation,
      securityNumber,
      address,
    });
    await newStudent.save();
    res.status(201).json({
      status: "PASS",
      message: "Admission successful",
      student: newStudent,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      message: "Failed to create admission",
      error: err.message,
    });
  }
});
module.exports = router;
