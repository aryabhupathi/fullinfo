const express = require("express");
const FeePayment = require("../schemas/FeeSchema");
const Student = require("../schemas/StudentAdmissionSchema");
const router = express.Router();
router.get("/pendingfee", async (req, res) => {
  try {
    const pendingFees = await FeePayment.find({
      balance: { $gt: 0 },
      status: { $in: ["Partially Paid", "Overdue"] },
    });
    res.json(pendingFees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/student", async (req, res) => {
  const { name } = req.query;
  try {
    const student = await Student.findOne({ rollNumber: name });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({
      studentName: student.studentName,
      className: student.className,
      section: student.sectionName,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/activity", async (req, res) => {
  const { activity } = req.query;
  const feeConfig = {
    Mathematics: {
      totalFee: 5000,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    Science: {
      totalFee: 6000,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    Sports: {
      totalFee: 3000,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    Debate: {
      totalFee: 2000,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  };
  const config = feeConfig[activity];
  if (config) {
    res.json(config);
  } else {
    res.status(404).json({ error: "Activity not found" });
  }
});
router.post("/payfee", async (req, res) => {
  try {
    const { rollNumber, activity, paidAmount, transactionId } = req.body;
    const rollNumberNum = Number(rollNumber);
    let record = await FeePayment.findOne({
      rollNumber: rollNumberNum,
      activity,
    });
    if (!record) {
      const requiredFields = ["studentName", "className", "section", "dueDate"];
      const missing = requiredFields.filter((f) => !req.body[f]);
      if (missing.length > 0) {
        return res
          .status(400)
          .json({ error: `Missing required fields: ${missing.join(", ")}` });
      }
      record = new FeePayment(req.body);
    } else {
      const amount = Number(paidAmount) || 0;
      record.paidAmount += amount;
      record.paymentHistory.push({
        amount,
        paymentDate: new Date(),
        transactionId: transactionId || "manual_update",
      });
    }
    await record.save();
    res
      .status(200)
      .json({ message: "Payment recorded successfully!", data: record });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
