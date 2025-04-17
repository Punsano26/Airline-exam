const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const jwt = require('jsonwebtoken');
const Passenger = require('../models/Passenger');

// Middleware ตรวจสอบ Token
function verifyPassenger(req, res, next) {
  const token = req.cookies.passengerToken;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.passengerId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// POST: จองเที่ยวบินและสร้างตั๋ว
router.post('/:flightId', verifyPassenger, async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight || flight.availableSeats < 1)
      return res.status(400).json({ error: 'ไม่มีที่นั่งว่าง' });

    // สุ่มเลขที่นั่งและ ticketCode
    const seatNumber = `A${Math.floor(Math.random() * 100 + 1)}`;
    const ticketCode = `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const ticket = new Ticket({
      flightId: flight._id,
      passengerId: req.passengerId,
      seatNumber,
      price: flight.price,
      ticketCode
    });
    await ticket.save();

    // ลดที่นั่งใน flight
    flight.availableSeats -= 1;
    await flight.save();

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: ดูตั๋วของผู้โดยสาร
router.get('/my', verifyPassenger, async (req, res) => {
  const tickets = await Ticket.find({ passengerId: req.passengerId })
    .populate('flightId')
    .populate('passengerId');
  res.json(tickets);
});

module.exports = router;
