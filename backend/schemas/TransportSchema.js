

const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  transportNumber: { type: String, required: true, unique:true },
  routeName: {type: String, required: true},
  size: { type: String, required: true },
  driverName: { type: String, required: true },
  mobileNumber: {type: String, required: true},  
});

module.exports = mongoose.model("Transport", transportSchema);
