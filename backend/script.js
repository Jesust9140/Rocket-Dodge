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