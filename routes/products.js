const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/import', async (req, res) => {
  try {
    await Product.insertMany(req.body);
    res.status(201).send('Import erfolgreich');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
router.post("/import", async (req, res) => {
  try {
    await Product.insertMany(req.body);
    res.status(200).send("Produkte importiert");
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Import");
  }
});

