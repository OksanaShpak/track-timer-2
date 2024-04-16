export { addTimerForm, timerList, getTimerItem }

const addTimerForm = document.getElementById('add-timer');
const timerList = document.querySelector('.timers');

function getTimerItem(id) {
  return timerList.querySelector(`[data-id="${id}"]`);
}