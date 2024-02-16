let startTime;
let running = false;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(interval);
        document.getElementById("startStop").innerText = "Start";
        running = false;
    } else {
        startTime = new Date().getTime() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
        interval = setInterval(updateDisplay, 1000);
        document.getElementById("startStop").innerText = "Stop";
        running = true;
    }
}

function reset() {
    clearInterval(interval);
    document.getElementById("display").innerText = "00:00:00:00";
    document.getElementById("startStop").innerText = "Start";
    running = false;
    laps = [];
    updateLapList();
}

function lap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        updateLapList();
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").innerText = formattedTime;
}
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

function updateLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(lapItem);
    });
}