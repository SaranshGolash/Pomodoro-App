const audio = new Audio("sounds/bell.wav");
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const pauseBtn = document.getElementById('pause');
const session = document.querySelector('.minutes');
const secondsDiv = document.querySelector('.seconds');
let interval;
let state = true;
let paused = false;
let totalSec = 0;

const appTimer = () => {
    if (state) {
        state = false;
        totalSec = Number.parseInt(session.textContent) * 60;
        const update = () => {
            if (!paused) {  // If not paused, continue countdown
                totalSec--;
                let minutesLeft = Math.floor(totalSec / 60);
                let secondsLeft = totalSec % 60;
                secondsDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
                session.textContent = `${minutesLeft}`;
                if (minutesLeft === 0 && secondsLeft === 0) {
                    audio.play();
                    clearInterval(interval);
                    state = true; // Reset state so a new session can be started
                    session.textContent = '25'; // Reset back to the initial time
                    secondsDiv.textContent = '00'; 
                }
            }
        };
        update();
        interval = setInterval(update, 1000);
    } else {
        alert('Session has already started');
    }
};

// Reset button functionality
const resetTimer = () => {
    clearInterval(interval);
    state = true;
    paused = false;
    totalSec = Number.parseInt(session.textContent) * 60; // Reset to the initial time
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    session.textContent = '25';
    secondsDiv.textContent = seconds < 10 ? '0' + seconds : seconds;
    pauseBtn.textContent = 'Pause';  // Reset the button to 'Pause' after reset
};

// Pause/Resume button functionality
const togglePause = () => {
    if (!state) { // Ensures that it works only when a session is running
        paused = !paused;
        pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    }
};
startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', togglePause);