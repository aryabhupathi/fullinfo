const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  activityName: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  headName: { type: String, required: true },
  description: { type: String, required: false },
});
module.exports = mongoose.model("Activities", activitySchema);
