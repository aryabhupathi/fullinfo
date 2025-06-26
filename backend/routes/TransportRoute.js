const express = require("express");
const router = express.Router();
const Transport = require("../schemas/TransportSchema"); // Make sure path is correct

// GET all transport details
router.get("/transportdetails", async (req, res) => {
  try {
    const transports = await Transport.find();
    const count = transports.length;
    res.status(200).json({ count: count, transports: transports });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch transport data", error: err.message });
  }
});

// POST a new transport
router.post("/addtransport", async (req, res) => {
  const { transportNumber, routeName, size, driverName, mobileNumber } =
    req.body;

  try {
    const newTransport = new Transport({
      transportNumber,
      routeName,
      size,
      driverName,
      mobileNumber,
    });
    const existingRoute = await Transport.findOne({ transportNumber });
    if (existingRoute) {
      return res
        .status(409)
        .json({ status: "FAIL", message: "Route already exists" });
    }
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add transport", error: err.message });
  }
});

module.exports = router;
