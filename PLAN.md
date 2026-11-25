
# Pomodoro Web App Plan

## Problem and approach

Build a no-framework Pomodoro app with a 25-minute work phase, a 5-minute break phase, pause/resume/reset controls, circular progress, a transition sound, and a session counter persisted in `localStorage`. Keep the implementation to `index.html`, `style.css`, and `app.js`, with no build step.

Behavior decisions:

- The app starts in the Work phase, paused, with a 25-minute remaining duration.
- The counter represents completed Work phases. It increments only after a Work phase reaches zero and is saved to `localStorage` under the key `pomodoroSessionCount`.
- Reset restores the current active phase to its full duration and pauses the timer. It does not change the phase or session counter.
- Work completes by transitioning to Break; Break completes by transitioning to Work.
- The timer uses a deadline timestamp and remaining-duration state so browser interval throttling does not make the countdown inaccurate.
- Progress represents elapsed percentage: 0% at the full duration and 100% at zero.
- A short tone is generated in the browser at each phase transition; no audio asset is added.
- `Start` begins the Work phase from its initial state. `Pause` stops the countdown, `Resume` continues it, and `Reset` restores the active phase.
- Pause and Resume update the same remaining-duration state; Reset cancels the active interval.
- Timer controls are disabled when their action is unavailable: Pause is disabled when paused, Resume and Start are disabled while running, and Reset is always available.

## File responsibilities and proposed function signatures

### `index.html`

- Define the accessible app structure: separate Work/Break phase label and running/paused status label, time display, circular progress element, session counter, and Start/Pause, Resume, and Reset controls.
- Provide stable element IDs and appropriate ARIA attributes for status and controls.
- Load `style.css` and `app.js`; provide the DOM elements and IDs used by the script.
- No JavaScript functions are defined in this file.

### `style.css`

- Style the timer layout, circular progress indicator, phase/status states, and controls.
- Provide clear focus and disabled states, and responsive layout behavior.
- Keep progress rendering compatible with elapsed-percentage state in `app.js`.
- No JavaScript functions are defined in this file.

### `app.js`

- Define timer durations, active phase, running state, remaining time, deadline timestamp, interval handle, DOM references, and persisted session count.
- Initialize the DOM, state, display, progress, controls, and persisted count once the DOM is ready.
- Implement the timer lifecycle, deadline-based ticking, pause/resume, reset, Work/Break transitions, display/progress updates, generated sound, and `localStorage` read/write.

Proposed JavaScript signatures with JSDoc types:

```js
/** @returns {void} */
function initializeTimer()

/** @returns {void} */
function startTimer()

/** @returns {void} */
function pauseTimer()

/** @returns {void} */
function resetTimer()

/** Recalculates remaining time from the deadline and handles phase completion. @returns {void} */
function tick()

/** @returns {void} */
function switchPhase()

/** @returns {void} */
function renderTimer()

/** @param {number} remainingMs @param {number} durationMs @returns {void} */
function updateProgress(remainingMs, durationMs)

/** @param {number} remainingMs @returns {string} */
function formatTime(remainingMs)

/** @returns {void} */
function playTransitionSound()

/** @returns {number} */
function loadSessionCount()

/** @param {number} count @returns {void} */
function saveSessionCount(count)
```

Additional implementation rules:

- Store durations in seconds or milliseconds consistently; the proposed signatures use milliseconds for rendering and progress.
- Read `pomodoroSessionCount` once during initialization. Missing storage means zero; valid stored integer values are accepted. Invalid, negative, non-finite, or malformed values are treated as zero.
- Wrap `localStorage` reads and writes in try/catch handling. Blocked storage or write failures must not stop timer operation.
- Use a single interval handle and clear it whenever the timer pauses, resets, or completes a phase.
- On `tick()`, clamp elapsed deadlines to prevent negative remaining time. Complete the phase once remaining time is zero or less.
- Prevent duplicate phase completion when rapid clicks or delayed intervals call `tick()` repeatedly.
- Resume from zero must switch to a new phase or restore/reset the active duration before starting.

## Build order

1. Create the semantic HTML, stable element IDs, accessible status/control structure, and script/style links.
2. Style the layout, circular progress display, focus/disabled states, and responsive behavior.
3. Implement timer constants, state, DOM references, initialization, deadline-based ticking, rendering, and safe session-count persistence in `app.js`.
4. Wire Start/Pause/Resume/Reset controls and enforce the running/paused/disabled-state rules.
5. Implement Work → Break → Work transitions, increment/persist the count after completed Work phases only, and add the generated transition tone.
6. Verify with browser tests: initial state, start, pause/resume, reset, both phase transitions, circular progress, malformed/missing localStorage values, and persistence after reload.
7. Stress-test rapid button clicks, delayed intervals or background-tab throttling, and refresh behavior before considering the app complete.
