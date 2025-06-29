const express = require("express");
const router = express.Router();
const Transport = require("../schemas/TransportSchema");
const Student = require("../schemas/StudentAdmissionSchema"); 
router.post("/addTransport", async (req, res) => {
  try {
    const transport = new Transport(req.body);
    await transport.save();
    res.status(201).json({ status: "PASS", transport });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:vehicleNumber", async (req, res) => {
  try {
    const vehicleNumber = req.params.vehicleNumber;
    const transport = await Transport.findOne({ vehicleNumber });
    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.json(transport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transport = await Transport.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
