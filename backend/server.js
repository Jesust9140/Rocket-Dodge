const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Score = require('./models/Score');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse incoming JSON
app.use(express.json());

// Serve static files correctly from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// API to save scores
app.post('/api/Score', async (req, res) => {
    try {
      const newScore = await Score.create(req.body);
      res.status(201).json(newScore);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);