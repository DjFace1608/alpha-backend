
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
