export { renderTimers, addTimerItem, updateTimerItem, removeTimerItem };

import { timers } from './storage.js';
import { timerList, getTimerItem } from './elements.js';
import { formatTime } from "./format.js";
import { runTimer } from './timer.js';

function renderTimers() {
  timers.forEach(addTimerItem);
}

function addTimerItem(timer) {
  timerList.append(createTimerItem(timer));

  if (timer.isRunning) {
    runTimer(timer.id);
  }
}

function createTimerItem(timer) {
  const item = document.createElement('li');

  item.innerHTML = `
    <span>${timer.name}</span>
    <span>${formatTime(Math.floor(timer.ms / 1000))}</span>
    <button>${timer.isRunning ? 'Pause' : timer.ms ? 'Resume' : 'Start'}</button>
    <button>X</button>
    <button>Edit</button>
  `;

  item.dataset.id = timer.id;

  return item;
}

function updateTimerItem(timer) {
  const item = getTimerItem(timer.id);
  const [name, seconds, button] = item.children;

  name.textContent = timer.name;
  seconds.textContent = formatTime(Math.floor(timer.ms / 1000));
  button.textContent = timer.isRunning ? 'Pause' : timer.ms ? 'Resume' : 'Start';
}

function removeTimerItem(id) {
  const item = getTimerItem(id);

  item.remove();
}