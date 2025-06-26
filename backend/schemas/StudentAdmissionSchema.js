const mongoose = require("mongoose");
const studentAdmissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true},
  dateofbirth: { type: Date, required: true },
  className: { type: String, required: true },
  sectionName: { type: String, required: true },
  dateofadmission: { type: Date, required: true },
  admissionSession: { type: String, required: true },
  oldSchool: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: false },
  mobileNumber: { type: Number, required: true },
  aadharNumber: { type: Number, required: true },
  religion: { type: String, required: false },
  caste: { type: String, required: false },
  parentOccupation: { type: String, required: false },
  securityNumber: { type: String, required: false },
  address: { type: String, required: true },
});
module.exports = mongoose.model("NewAdmissions", studentAdmissionSchema);
