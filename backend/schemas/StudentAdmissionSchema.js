const mongoose = require("mongoose");
const studentAdmissionSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    fathermobileNumber: {
      type: Number,
      required: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    className: {
      type: String,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    dateofadmission: {
      type: Date,
      required: true,
    },
    parentOccupation: {
      type: String,
    },
    securityNumber: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    needTransport: {
      type: String,
      required: true,
    },
    transportOpted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransportNew",
      default: null,
    },
    transportVehicle: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
studentAdmissionSchema.index({ transportVehicle: 1 });
module.exports = mongoose.model("NewAdmissions", studentAdmissionSchema);
