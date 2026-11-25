const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_MS = 5 * 60 * 1000;
const SESSION_COUNT_KEY = "pomodoroSessionCount";

let activePhase = "work";
let isRunning = false;
let remainingSeconds = WORK_DURATION_SECONDS;
let deadlineTimestamp = null;
let intervalHandle = null;
let sessionCount = 0;

const elements = {
  phaseLabel: null,
  statusLabel: null,
  timeDisplay: null,
  progressRing: null,
  sessionCount: null,
  startButton: null,
  pauseButton: null,
  resumeButton: null,
  resetButton: null,
};

/** @returns {void} */
function initializeTimer() {
  elements.timeDisplay = document.getElementById("time-display");
  elements.startButton = document.getElementById("start-button");
  elements.startButton.addEventListener("click", startTimer);
  renderTimer();
}

/** @returns {void} */
function startTimer() {
  if (intervalHandle !== null || remainingSeconds === 0) {
    return;
  }

  intervalHandle = setInterval(function () {
    remainingSeconds = Math.max(0, remainingSeconds - 1);
    renderTimer();

    if (remainingSeconds === 0) {
      clearInterval(intervalHandle);
      intervalHandle = null;
      console.log("work complete");
    }
  }, 1000);
}

/** @returns {void} */
function pauseTimer() {
}

/** @returns {void} */
function resetTimer() {
}

/** Recalculates remaining time from the deadline and handles phase completion. @returns {void} */
function tick() {
}

/** @returns {void} */
function switchPhase() {
}

/** @returns {void} */
function renderTimer() {
  elements.timeDisplay.textContent = formatTime(remainingSeconds);
}

/** @param {number} remainingMs @param {number} durationMs @returns {void} */
function updateProgress(remainingMs, durationMs) {
}

/** @param {number} remainingSeconds @returns {string} */
function formatTime(remainingSeconds) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

/** @returns {void} */
function playTransitionSound() {
}

/** @returns {number} */
function loadSessionCount() {
}

/** @param {number} count @returns {void} */
function saveSessionCount(count) {
}

initializeTimer();
