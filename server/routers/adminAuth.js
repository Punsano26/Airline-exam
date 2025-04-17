const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER admin (ทำแค่ครั้งแรก)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashed });
  await admin.save();
  res.status(201).json({ message: 'Admin created' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('adminToken', token, {
    httpOnly: true,
    sameSite: 'lax'
  }).json({ message: 'Logged in successfully' });
});

// CHECK AUTH
router.get('/me', (req, res) => {
  const token = req.cookies.adminToken;
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
  res.clearCookie('adminToken').json({ message: 'Logged out' });
});

module.exports = router;
