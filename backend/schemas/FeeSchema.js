const mongoose = require("mongoose");
const FeePayment = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
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
  },
  totalFee: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  balance: {
    type: Number,
    default: function () {
      return this.totalFee - this.paidAmount;
    },
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paymentHistory: [
    {
      amount: Number,
      paymentDate: {
        type: Date,
        default: Date.now,
      },
      transactionId: String,
    },
  ],
  status: {
    type: String,
    enum: ["Paid", "Partially Paid", "Overdue"],
    default: function () {
      const balance = this.totalFee - this.paidAmount;
      if (balance <= 0) return "Paid";
      if (new Date() > this.dueDate) return "Overdue";
      return "Partially Paid";
    },
  },
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
