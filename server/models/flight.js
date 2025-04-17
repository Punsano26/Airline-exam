// server/models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Flight', flightSchema);
