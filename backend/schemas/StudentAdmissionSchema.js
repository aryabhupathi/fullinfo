// const mongoose = require("mongoose");
// const studentAdmissionSchema = new mongoose.Schema({
//   studentName: { type: String, required: true },
//   fatherName: { type: String, required: true },
//   motherName: { type: String, required: false },
//   mobileNumber: { type: Number, required: true },
//   fathermobileNumber: { type: Number, required: true },
//   aadharNumber: { type: Number, required: true }, 
//   rollNumber: { type: String, required: true, unique: true },
//   className: { type: String, required: true },
//   sectionName: { type: String, required: true },
//   dateofbirth: { type: Date, required: true },
//   dateofadmission: { type: Date, required: true },
//   securityNumber: { type: String, required: false },
//   address: { type: String, required: true },
//   needTransport: { type: String, required:true},
//   transportOpted: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "TransportNew",
//     default: null,   
//   },
//   transportVehicle: {
//     type: String,
//     ref: "TransportNew", // optional reference if needed
//   },
// });
// module.exports = mongoose.model("NewAdmissions", studentAdmissionSchema);

const mongoose = require("mongoose");

const studentAdmissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  fathermobileNumber: {
    type: Number,
    required: true
  },
  aadharNumber: {
    type: Number,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true
  },
  sectionName: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  dateofadmission: {
    type: Date,
    required: true
  },
  parentOccupation: {
    type: String,
    required: false
  },
  securityNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  needTransport: {
    type: String,
    required: true
  },
  transportOpted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TransportNew",
    default: null
  },
  transportVehicle: {
    type: String,
    ref: "TransportNew.vehicleNumber", // Reference by vehicleNumber
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("NewAdmissions", studentAdmissionSchema);