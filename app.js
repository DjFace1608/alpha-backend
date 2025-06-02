
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error(err));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Alpha Backend läuft!');
});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});
