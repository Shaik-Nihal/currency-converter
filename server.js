const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Environment variables validation
if (!process.env.EXCHANGE_RATE_API_KEY) {
    throw new Error('EXCHANGE_RATE_API_KEY environment variable is not set');
}

// API endpoint base URL
const EXCHANGE_RATE_API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Endpoint to fetch exchange rates
app.get('/api/exchange-rate', async (req, res, next) => {
    const { from } = req.query;

    if (!from) {
        return res.status(400).json({ error: 'Missing required parameter: from' });
    }

    console.log(`Fetching exchange rates for: ${from}`);
    console.log(`Using API Key: ${API_KEY}`);

    try {
        const response = await fetch(`${EXCHANGE_RATE_API_URL}/${API_KEY}/latest/${from}`);
        const data = await response.json();

        if (data.result === 'error') {
            console.error('ExchangeRate-API Error:', data['error-type']);
            return res.status(500).json({ error: data['error-type'] });
        }

        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Endpoint to fetch supported currencies
app.get('/api/supported-currencies', async (req, res, next) => {
    try {
        const response = await fetch(`${EXCHANGE_RATE_API_URL}/${API_KEY}/codes`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Serve static files (your frontend)
app.use(express.static('public'));

// Use error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});