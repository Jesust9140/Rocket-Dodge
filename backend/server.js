const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Score = require('./models/Score');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// POST route to save a new score
app.post('/api/scores', async (req, res) => {
    try {
      const newScore = await Score.create(req.body);
      res.status(201).json(newScore);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});