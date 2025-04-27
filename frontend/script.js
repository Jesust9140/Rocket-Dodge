// Select page elements
const rocket = document.getElementById('rocket');
const asteroidContainer = document.getElementById('asteroid-container');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const playerNameDisplay = document.getElementById('player-name');

// Initialize important variables
let rocketPosX = 50;
let gameInterval;
let asteroidInterval;
let timer = 0;
let username = 'Anonymous'; // Default name if player skips input

// Function to move the rocket based on key presses
function moveRocket(event) {
  if (event.key === 'ArrowLeft' && rocketPosX > 0) {
    rocketPosX -= 5;
  } else if (event.key === 'ArrowRight' && rocketPosX < 100) {
    rocketPosX += 5;
  }
  rocket.style.left = `${rocketPosX}%`;
}

// Function to create a random-sized asteroid
function createAsteroid() {
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  
  // Set random size for each asteroid
  const size = Math.random() * 30 + 20;
  asteroid.style.width = `${size}px`;
  asteroid.style.height = `${size}px`;

  // Set random horizontal position
  asteroid.style.left = `${Math.random() * (400 - size)}px`;
  asteroid.style.top = `-40px`;
  
  asteroidContainer.appendChild(asteroid);
}

// Function to move all existing asteroids downward
function moveAsteroids() {
  const asteroids = document.querySelectorAll('.asteroid');
  asteroids.forEach(asteroid => {
    let top = parseInt(asteroid.style.top);
    asteroid.style.top = `${top + 5}px`;

    // Remove asteroid if it falls off the screen
    if (top > 600) {
      asteroid.remove();
    }

    // Check for collision between rocket and asteroid
    if (checkCollision(asteroid)) {
      endGame('Game Over!');
    }
  });
}

// Function to check if two objects (rocket and asteroid) collide
function checkCollision(asteroid) {
  const rocketRect = rocket.getBoundingClientRect();
  const asteroidRect = asteroid.getBoundingClientRect();

  return !(
    rocketRect.top > asteroidRect.bottom ||
    rocketRect.bottom < asteroidRect.top ||
    rocketRect.right < asteroidRect.left ||
    rocketRect.left > asteroidRect.right
  );
}

// Function to update the survival timer every second
function updateTimer() {
  timer++;
  timerDisplay.textContent = `Time: ${timer}s`;

  // End the game if the player survives for 30 seconds
  if (timer >= 30) {
    endGame('You Win!');
  }
}

// Function to handle what happens when the game ends
function endGame(text) {
  clearInterval(gameInterval);
  clearInterval(asteroidInterval);
  document.removeEventListener('keydown', moveRocket);

  // Display win/lose message
  message.textContent = text;
  message.classList.remove('hidden');

  // If the player wins, allow them to enter a username
  if (text === 'You Win!') {
    const inputUsername = prompt('You won! Enter your name:') || 'Anonymous';
    username = inputUsername;
    playerNameDisplay.textContent = `Player: ${username}`;

    // Save the score
    saveScoreToDatabase(username, timer);
  }
}

// Function to actually save the player's score into localStorage
function saveScoreToDatabase(name, score) {
  // Try to grab existing scores from localStorage
  const existingScores = JSON.parse(localStorage.getItem('scores')) || [];

  // Create a new score entry
  const newEntry = { username: name, score: score };

  // Add the new entry to existing scores
  existingScores.push(newEntry);

  // Save everything back into localStorage
  localStorage.setItem('scores', JSON.stringify(existingScores));

  console.log('✅ Score saved to database!');
}

// Function to start the game
function startGame() {
  username = prompt('Enter your username:') || 'Anonymous';
  playerNameDisplay.textContent = `Player: ${username}`;

  document.addEventListener('keydown', moveRocket);

  // Set up intervals to move asteroids and update timer
  gameInterval = setInterval(() => {
    moveAsteroids();
    updateTimer();
  }, 100);

  asteroidInterval = setInterval(() => {
    createAsteroid();
  }, 1000);
}

// Start the game when the page loads
startGame();
