const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');
const menu = require('./data/menu.json');
const storeInfo = require('./data/store.json');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/menu', (req, res) => {
    res.json(menu);
});

app.get('/api/store-info', (req, res) => {
    res.json(storeInfo);
});

app.get('/', (req, res) => {
    res.send('5 Spice Server is Running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
