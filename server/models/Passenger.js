const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  fullNameTH: { type: String, required: true },
  fullNameEN: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Passenger', passengerSchema);
