//Essentials Modules
const express = ("express");
const mongoose = require('mongoose');
const Score = require('./models/Score');

//Connection to Mongo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Initialize Express app
const app = express();
const PORT = 3000;

// Pathing 
app.use(express.static('frontend'));// Fixed my pathing
res.sendFile(__dirname + '/frontend/index.html');

// Middleware to serve static files from 'frontend' directory
app.use(express.static('frontend'));

// Middleware to parse JSON requests
app.use(express.json());

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// POST route to save player scores
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

// Function to save player score to the database after winning
function saveScoreToDatabase(username, score) {
    fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, score })
    })
    .then(response => response.json())
    .then(data => console.log('Score saved:', data))
    .catch(error => console.error('Error:', error));
  }