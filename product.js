
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  name: String,
  unit: String,
});

module.exports = mongoose.model('Product', productSchema);
