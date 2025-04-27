//Select elements from the page
const rocket = document.getElementById('rocket');
const asteriodContainer = document.getElementById('asteriod-container')
const message = document.getElementById(message);
const timerDisplayer = document.getElementById('timer')

// initialize rocket postion, game intervals and timer
let rocketposX = 50;
let gameInterval; 
let asteriodInterval;
let timer = 0;


// function to move the rocket left and right

function moveRocket(event){
    if (event.key === 'ArrowLeft' && rocketposX > 0 ) {
        rocketposX -= 5; 
    } else if (event.key === 'ArrowRight' && rocketposX < 100){
        rocketposX += 5;
    }
    rocket.style.left = `${rocketposX}%`;
}
//function to create a new asteriodd
//
function createAsteriod(){
    const asteriod = document.createElement('div')
    asteriod.classList.add('asteriod')
    asteriod.style.left =`${Math.randon()* 360}px`;
    asteriod.style.top = `-40px`;
    asteriodContainer.appendChild(asteriod);
}

// Function to move all asteroids downward
function moveAsteroids() {
    const asteroids = document.querySelectorAll('.asteroid');
    asteroids.forEach(asteroid => {
      let top = parseInt(asteroid.style.top);
      asteroid.style.top = `${top + 5}px`;
  
      // Remove asteroids that fall off screen
      if (top > 600) {
        asteroid.remove();
      }
  
      // Check if the rocket collides with an asteroid
      if (checkCollision(asteroid)) {
        endGame('Game Over!');
      }
    });
  }
  
  // Function to check collision between rocket and asteroid
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
  
  // Function to update the survival timer
  function updateTimer() {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (timer >= 30) {
      endGame('You Win!');
    }
  }
  
  // Function to end the game
  function endGame(text) {
    clearInterval(gameInterval);
    clearInterval(asteroidInterval);
    document.removeEventListener('keydown', moveRocket);
    message.textContent = text;
    message.classList.remove('hidden');
  }
  
  // Function to start the game
  function startGame() {
    document.addEventListener('keydown', moveRocket);
    gameInterval = setInterval(() => {
      moveAsteroids();
      updateTimer();
    }, 100);
  
    asteroidInterval = setInterval(() => {
      createAsteroid();
    }, 1000);
  }
  
  startGame();