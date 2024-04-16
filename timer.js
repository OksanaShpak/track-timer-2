export { addTimer, createTimer, pauseTimer, runTimer, deleteTimer, editTimer };

import { timers, saveTimers, genId } from './storage.js';
import { addTimerItem, updateTimerItem, removeTimerItem } from "./render.js";

let timerId;

function addTimer(name) {
  const timer = createTimer(name);

  timers.push(timer);

  saveTimers();
  addTimerItem(timer);
}

function createTimer(name) {
  const timer = {
    id: genId(),
    last: null,
    ms: 0,
    isRunning: false,
    name,
  }

  return timer;
}

function runTimer(id) {
  const timer = timers.find(timer => timer.id === id);

  if (typeof timerId === 'number') {
    const timer = timers.find(timer => timer.isRunning);

    pauseTimer(timer.id);
  }

  timer.isRunning = true;
  if (!timer.last) timer.last = Date.now();

  timerId = setInterval(() => {
    const now = Date.now();
    const delta = now - timer.last;

    timer.last = now;
    timer.ms += delta;
    updateTimer(timer);
  }, 1000);
}

function pauseTimer(id) {
  const timer = timers.find(timer => timer.id === id);

  if (!timer.isRunning) return;

  const now = Date.now();
  const delta = now - timer.last;

  timer.ms += delta;
  timer.last = null;

  timer.isRunning = false;

  clearInterval(timerId);
  updateTimer(timer);

  timerId = null;
}

function updateTimer(timer) {
  saveTimers();
  updateTimerItem(timer);
}

function deleteTimer(id) {
  const index = timers.findIndex(timer => timer.id === id);
  const timer = timers[index];

  timers.splice(index, 1);

  saveTimers();

  if (timer.isRunning) {
    clearInterval(timerId);

    timerId = null;
  }

  removeTimerItem(id);
}

function editTimer(id) {
  const timer = timers.find(timer => timer.id === id);
  const name = prompt('Enter a new name', timer.name);

  if (!name) return;

  timer.name = name;

  saveTimers();
  updateTimerItem(timer);
}