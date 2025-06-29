const express = require("express");
const router = express.Router();
const Transport = require("../schemas/TransportSchema");
const NewAdmission = require("../schemas/StudentAdmissionSchema");
router.get("/students", async (req, res) => {
  try {
    const students = await NewAdmission.find().select("-__v");
    res.status(200).json({ count: students.length, students });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: err.message });
  }
});
router.get("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await NewAdmission.findById(id).select("-__v");
    if (!student)
      return res
        .status(404)
        .json({ status: "FAIL", message: "Student not found" });
    res.status(200).json({ status: "PASS", student });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", message: "Server error", error: err.message });
  }
});
router.get("/student", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        status: "FAIL",
        message: "Student name is required in query params",
      });
    }
    const student = await NewAdmission.findOne({
      studentName: { $regex: new RegExp(`^${name}$`, "i") },
    }).select("-__v");
    if (!student) {
      return res.status(404).json({
        status: "FAIL",
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: "PASS",
      student,
    });
  } catch (err) {
    console.error("Error fetching student:", err.message);
    res.status(500).json({
      status: "FAIL",
      message: "Server error while fetching student",
    });
  }
});
router.post("/newAdmission", async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      mobileNumber,
      fathermobileNumber,
      aadharNumber,
      className,
      sectionName,
      dateofbirth,
      dateofadmission,
      securityNumber,
      address,
      needTransport,
    } = req.body;
    const requiredFields = {
      studentName,
      fatherName,
      mobileNumber,
      fathermobileNumber,
      className,
      sectionName,
      dateofbirth,
      dateofadmission,
      address,
      aadharNumber,
      needTransport,
    };
    const missingFields = Object.entries(requiredFields).filter(
      ([key, value]) => !value && value !== 0
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "FAIL",
        message: `Missing fields: ${missingFields
          .map(([key]) => key)
          .join(", ")}`,
      });
    }
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        status: "FAIL",
        message: "Student mobile number must be 10 digits",
      });
    }
    if (!/^[0-9]{10}$/.test(fathermobileNumber)) {
      return res.status(400).json({
        status: "FAIL",
        message: "Father mobile number must be 10 digits",
      });
    }
    const dob = new Date(dateofbirth);
    const doa = new Date(dateofadmission);
    if (isNaN(dob.getTime()) || isNaN(doa.getTime())) {
      return res.status(400).json({
        status: "FAIL",
        message: "Invalid date format",
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
    const admissionYear = doa.getFullYear();
    const baseRollPrefix = `${admissionYear}${className}${sectionName}`;
    const lastStudent = await NewAdmission.findOne({
      rollNumber: new RegExp(`^${baseRollPrefix}\\d{3}$`),
    }).sort({ rollNumber: -1 });
    let nextSeq = 1;
    if (lastStudent && lastStudent.rollNumber) {
      const seqPart = lastStudent.rollNumber.slice(-3);
      const seq = parseInt(seqPart, 10);
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
    return res.status(201).json({
      status: "PASS",
      message: "Admission successful",
      student: newStudent,
    });
  } catch (err) {
    console.error({
      message: err.message,
      stack: err.stack,
      body: req.body,
    });
    return res.status(500).json({
      status: "FAIL",
      message: "Failed to create admission",
    });
  }
});
router.put("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStudent = await NewAdmission.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ status: "FAIL", message: "Student not found" });
    }
    return res.status(200).json({
      status: "PASS",
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err.message);
    return res.status(500).json({ status: "FAIL", message: "Server error" });
  }
});
router.delete("/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await NewAdmission.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ status: "FAIL", message: "Student not found" });
    }
    return res.status(200).json({
      status: "PASS",
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting student:", err.message);
    return res.status(500).json({ status: "FAIL", message: "Server error" });
  }
});
router.post("/assigntransport", async (req, res) => {
  const { studentId, vehicleNumber } = req.body;
  console.log(req.body, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  if (!studentId || !vehicleNumber)
    return res.status(400).json({ status: "FAIL", message: "Missing fields" });
  try {
    const student = await NewAdmission.findById(studentId);
    if (!student)
      return res
        .status(404)
        .json({ status: "FAIL", message: "Student not found" });
    const vehicle = await Transport.findOne({ vehicleNumber });
    if (!vehicle)
      return res
        .status(404)
        .json({ status: "FAIL", message: "Vehicle not found" });
    const studentCount = await NewAdmission.countDocuments({
      transportVehicle: vehicle.vehicleNumber,
    });
    const capacityMap = {
      small: 15,
      medium: 30,
      large: 40,
    };
    if (studentCount >= capacityMap[vehicle.size]) {
      return res
        .status(400)
        .json({ status: "FAIL", message: "Vehicle at full capacity!" });
    }
    student.transportVehicle = vehicle.vehicleNumber;
    await student.save();
    await Transport.updateOne(
      { vehicleNumber: vehicle.vehicleNumber },
      { $push: { assignedStudentIds: student._id.toString() } }
    );
    return res.json({ status: "PASS", message: "Assigned successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "FAIL", message: "Server error" });
  }
});
router.get("/students/:vehicleNumber", async (req, res) => {
  const { vehicleNumber } = req.params;
  try {
    const vehicle = await Transport.findOne({ vehicleNumber });
    if (!vehicle) {
      return res
        .status(404)
        .json({ status: "FAIL", message: "Vehicle not found" });
    }
    const studentIds = vehicle.assignedStudentIds;
    const students = await NewAdmission.find({
      _id: { $in: studentIds },
    });
    res.json({
      status: "PASS",
      vehicle: {
        vehicleNumber: vehicle.vehicleNumber,
        driverName: vehicle.driverName,
        size: vehicle.size,
        totalStudents: students.length,
      },
      students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAIL", message: "Server error" });
  }
});
module.exports = router;
