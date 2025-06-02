
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Registrierung
router.post('/register', async (req, res) => {
  try {
    const { restaurantName, contactName, phone, address, email, password } = req.body;

    if (!restaurantName || !contactName || !phone || !address || !email || !password) {
      return res.status(400).json({ message: 'Bitte alle Felder ausfüllen.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'E-Mail bereits registriert.' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ restaurantName, contactName, phone, address, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'Registrierung erfolgreich.' });
  } catch (err) {
    res.status(500).json({ message: 'Serverfehler.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Ungültige Zugangsdaten.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Ungültige Zugangsdaten.' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Serverfehler.' });
  }
});

module.exports = router;
