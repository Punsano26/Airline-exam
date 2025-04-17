// server/routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const auth = require('../middlewares/adminOnly');
// CREATE - เพิ่มเที่ยวบินใหม่
router.post('/', auth, async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - ดึงเที่ยวบินทั้งหมด
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - แก้ไขเที่ยวบิน
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - ลบเที่ยวบิน
router.delete('/:id', auth, async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
