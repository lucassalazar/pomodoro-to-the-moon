let countdown = 0;
let remainingSeconds = 1500;
let workTime = 25;
let breakTime = 5;
let isPaused = true;
let isBreak = false;

const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
const pauseBtn = document.querySelector('#pause-btn');
const workMin = document.querySelector('#work-minimum');
const breakMin = document.querySelector('#break-minimum');
const minutesDisplay = document.querySelector('#minutes');
const secondsDisplay = document.querySelector('#seconds');
const workPlus = document.querySelector('#work-plus');
const workMinus = document.querySelector('#work-minus');
const breakPlus = document.querySelector('#break-plus');
const breakMinus = document.querySelector('#break-minus');
const status = document.querySelector('#status');
const rocket = document.querySelector('.rocket');
const trajectory = document.querySelector('.trajectory');
const footer = document.querySelector('.footer-space');
const alarm = document.createElement('audio'); 

alarm.setAttribute("src", "http://soundbible.com/mp3/Short_triumphal_fanfare-John_Stracke-815794903.mp3");

let start = 0;
let finish = footer.offsetWidth - 70;
console.log(`Start: ${start}, Finish: ${finish}, Footer Width: ${footer.offsetWidth}`);
let displacement = finish - start;
console.log('Displacement:', displacement);

let time = workTime * 60;
console.log('Time variation:', time);

let interval = displacement/time;
console.log('Interval:', interval);

let countMove = 0;

startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  clearInterval(countMove);
  isPaused = !isPaused;
  if(isPaused === false) {
    if(isBreak === false) {
      countMove = setInterval(move, 1000);
    }
    countdown = setInterval(timer, 1000);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  clearInterval(countMove);
  remainingSeconds = workTime * 60;
  time = workTime * 60;
  interval = displacement/time;
  countdown = 0;
  start = 0;
  isPaused = true;
  isBreak = false;
});

function timer() {
  if(remainingSeconds > 0) {
    remainingSeconds -= 1;
  } else {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    remainingSeconds = breakTime * 60;
    countdown = 0;
    isBreak = true;
    isPaused = true;
  }
}

function move() {
  if(start >= finish) {
    start = finish;
    clearInterval(countMove);
    console.log(start);
  } else {
    start += interval;
    rocket.style.left = start+'px';
  }
}

// Events to set the settings of work and break buttons

workPlus.addEventListener('click', () => {
  workTime = Math.min(workTime + 1, 60);
})

workMinus.addEventListener('click', () => {
  workTime = Math.max(workTime - 1, 5);
})

breakPlus.addEventListener('click', () => {
  breakTime = Math.min(breakTime + 1, 60);
})

breakMinus.addEventListener('click', () => {
  breakTime = Math.max(breakTime - 1, 5)
})

// Display and Update

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "Start";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }
}

function timerDisplay() {
  let minutes = Math.floor(remainingSeconds / 60);
  let seconds = remainingSeconds % 60;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds < 10 ? '0'.concat(seconds) : seconds; // Template String to concatenate the first digit, when seconds is lower than 10
}

function updateHtml() {
  buttonDisplay();
  timerDisplay();
  isBreak ? status.textContent = "Have a break!" : status.textContent = "Keep grinding!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;
  if(start >= finish) {
    rocket.style.left = finish + 'px';  
  } else {
    rocket.style.left = start + 'px';
  }
}

window.setInterval(updateHtml, 100);
document.onclick = updateHtml;
