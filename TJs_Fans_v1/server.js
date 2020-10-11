const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/v1/products', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show all products' });
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show product ${req.params.id}` });
});

app.post('/api/v1/products', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create new product' });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update product ${req.params.id}` });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete product ${req.params.id}` });
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
