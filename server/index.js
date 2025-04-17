// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const flightRoutes = require("./routers/flights");
const passengerAuth = require("./routers/passengerAuth");
const ticketRoutes = require("./routers/tickets");
const adminAuth = require("./routers/adminAuth");
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // URL ของ frontend
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));
app.use("/api/flights", flightRoutes);
app.use("/api/passenger", passengerAuth);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminAuth);
app.get("/", (req, res) => res.send("Welcome to Nakhon Pathom Airline API"));

app.listen(5000, () => console.log("Server running on port 5000"));
