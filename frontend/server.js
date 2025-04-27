const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Score = require('./models/Score'); // Assuming you already created this
require('dotenv').config(); // In case you use a .env file for MongoDB URI


//Connection to Mongo
const app = express();
const PORT = process.env.PORT || 3000;

/// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
  // Middleware to parse incoming JSON
  app.use(express.json());
  
  // Serve static files from the 'frontend' directory
  app.use(express.static(path.join(__dirname, 'frontend')));
  
  // Serve the index.html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
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
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });