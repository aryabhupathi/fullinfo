const express = require("express");
const mongoose = require("mongoose");
const FeePayment = require("../schemas/FeeSchema");
const Student = require("../schemas/StudentAdmissionSchema");
const router = express.Router();
const ACTIVITY_FEES = {
  Mathematics: 5000,
  Science: 6000,
  Sports: 3000,
  Debate: 2000,
};
const getDueDate = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
router.get("/", async (req, res) => {
  try {
    const fees = await FeePayment.find();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/pendingfee", async (req, res) => {
  try {
    const fees = await FeePayment.find({
      balance: { $gt: 0 },
      status: { $in: ["Partially Paid", "Overdue", "Paid"] },
    });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/student", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.query.name });
    if (!student) return res.status(404).json({ error: "Student not found" });
    const { studentName, className, sectionName } = student;
    res.json({ studentName, className, section: sectionName });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/activity", (req, res) => {
  const { activity } = req.query;
  const totalFee = ACTIVITY_FEES[activity];
  if (!totalFee) return res.status(404).json({ error: "Activity not found" });
  res.json({ totalFee, dueDate: getDueDate() });
});
router.post("/payfee", async (req, res) => {
  try {
    const {
      rollNumber,
      activity,
      paidAmount = 0,
      ...rest
    } = req.body;
    let record = await FeePayment.findOne({ rollNumber, activity });
    if (!record) {
      const requiredFields = [
        "studentName",
        "className",
        "section",
        "dueDate",
        "totalFee",
      ];
      const missing = requiredFields.filter((f) => !req.body[f]);
      if (missing.length)
        return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
      const newRecord = new FeePayment({
        ...rest,
        rollNumber,
        activity,
        paidAmount,
        balance: rest.totalFee - paidAmount,
        paymentHistory: [{ amount: paidAmount }],
      });
      await newRecord.save();
      return res.status(201).json(newRecord);
    }
    const newTotalPaid = record.paidAmount + Number(paidAmount);
    if (newTotalPaid > record.totalFee) {
      return res.status(400).json({ error: "Paid amount exceeds total fee." });
    }
    record.paidAmount = newTotalPaid;
    record.paymentHistory.push({
      amount: paidAmount,
      paymentDate: new Date(),
    });
    await record.save();
    return res.status(200).json(record);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const data = req.body;
  const required = [
    "studentName",
    "rollNumber",
    "className",
    "section",
    "activity",
    "totalFee",
    "paidAmount",
    "dueDate",
  ];
  const missing = required.filter((f) => !data[f]);
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
  }
  try {
    const record = await FeePayment.findById(id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    Object.assign(record, data);
    await record.save();
    return res.status(200).json({ message: "Record updated",  record });
  } catch (err) {
    console.error("Error updating fee:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/pendingfee", async (req, res) => {
  try {
    const { year, activity, className, section } = req.query;
    const filter = {};
    if (year) filter.year = year;
    if (activity) filter.activity = activity;
    if (className) filter.className = className;
    if (section) filter.section = section;
console.log(filter, "kkkkkkkkkkkkk")
    const fees = await FeePayment.find(filter);
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;