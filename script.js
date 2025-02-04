let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let display = document.getElementById('display');
let lapList = document.getElementById('lapList');

let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let laps = [];

function updateDisplay() {
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startStopwatch() {
    timer = setInterval(function () {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    lapList.innerHTML = '';
    laps = [];
}

function addLap() {
    laps.push(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${laps[laps.length - 1]}`;
    lapList.appendChild(lapItem);
}

startBtn.addEventListener('click', function () {
    isRunning = true;
    startStopwatch();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', function () {
    isRunning = false;
    stopStopwatch();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

resetBtn.addEventListener('click', function () {
    resetStopwatch();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

lapBtn.addEventListener('click', function () {
    if (isRunning) {
        addLap();
    }
});