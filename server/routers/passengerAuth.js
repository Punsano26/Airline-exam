const express = require('express');
const router = express.Router();
const Passenger = require('../models/Passenger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware เช็ค token
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
  
  // GET - ข้อมูลผู้โดยสาร
  router.get('/profile', verifyPassenger, async (req, res) => {
    const user = await Passenger.findById(req.passengerId).select('-password');
    res.json(user);
  });
  
  // PUT - แก้ไขข้อมูล
  router.put('/profile', verifyPassenger, async (req, res) => {
    try {
      const updates = { ...req.body };
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
      const updated = await Passenger.findByIdAndUpdate(req.passengerId, updates, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { fullNameTH, fullNameEN, email, phone, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const passenger = new Passenger({ fullNameTH, fullNameEN, email, phone, password: hashed });
    await passenger.save();
    res.status(201).json({ message: 'Register success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Passenger.findOne({ email });
  if (!user) return res.status(400).json({ error: 'ไม่พบผู้ใช้งาน' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('passengerToken', token, { httpOnly: true, sameSite: 'lax' }).json({ message: 'เข้าสู่ระบบสำเร็จ' });
});

// ME
router.get('/me', (req, res) => {
  const token = req.cookies.passengerToken;
  if (!token) return res.status(401).json({ isAuth: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAuth: true, id: decoded.id });
  } catch {
    res.status(401).json({ isAuth: false });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('passengerToken').json({ message: 'Logged out' });
});

module.exports = router;
