export { handleAdd, handleTimerClick };

import { addTimerForm } from './elements.js';
import { addTimer, runTimer, pauseTimer, deleteTimer, editTimer } from './timer.js';

function handleAdd() {
  const name = addTimerForm.name.value;

  if (!name) return;

  addTimer(name);
  addTimerForm.reset();
}

function handleTimerClick(event) {
  if (!event.target.matches('button')) return;

  const id = event.target.parentElement.dataset.id;
  const action = event.target.textContent;

  if (action === 'Start' || action === 'Resume') {
    runTimer(id);
  } else if (action === 'Pause') {
    pauseTimer(id);
  } else if (action === 'X') {
    deleteTimer(id);
  } else if (action === 'Edit') {
    editTimer(id);
  }
}

