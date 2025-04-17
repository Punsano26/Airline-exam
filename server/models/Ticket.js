const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Passenger' },
  seatNumber: { type: String, required: true },
  price: { type: Number, required: true },
  ticketCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
