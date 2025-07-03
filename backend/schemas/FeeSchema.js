const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});
const FeePayment = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    index: true,
  },
  className: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    index: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Partially Paid", "Overdue"],
    default: "Partially Paid",
  },
  paymentHistory: [PaymentSchema],
});
FeePayment.pre("save", function (next) {
  this.balance = this.totalFee - this.paidAmount;
  if (this.balance <= 0) {
    this.status = "Paid";
  } else if (new Date() > this.dueDate) {
    this.status = "Overdue";
  } else {
    this.status = "Partially Paid";
  }
  next();
});
module.exports = mongoose.model("FeePayment", FeePayment);
