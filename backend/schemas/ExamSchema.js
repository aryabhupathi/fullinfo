const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  stuClassName: { type: String, required: true },
  examType: { type: String, required: true},
  startingDate: { type: Date, required: true },
  examFee: { type: Number, required: true, default: 0 }
});
module.exports = mongoose.model("Exams", examSchema);
