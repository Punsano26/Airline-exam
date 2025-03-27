const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FlightSchema = new Schema(
  {
    flight_name: { type: String, require: true },
    departure_airport: { type: String, require: true },
    destination_airport: { type: String, require: true },
    start_time: { type: String, require: true },
    end_time: { type: String, require: true },
    destination_airport: { type: String, require: true },
    seats_number: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const FlightModel = model("Flight", FlightSchema);
module.exports = FlightModel;
