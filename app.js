import { addTimerForm, timerList } from './elements.js';
import { handleAdd, handleTimerClick } from './handlers.js';
import { loadTimers } from './storage.js';
import { renderTimers } from './render.js';

addTimerForm.onsubmit = handleAdd;
timerList.onclick = handleTimerClick;

loadTimers();
renderTimers();