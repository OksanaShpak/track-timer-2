export { loadTimers, saveTimers, timers, genId };

const timers = []; // {id, seconds, isRunning, name}
let lastId = 0;

loadId();

function saveTimers() {
  localStorage.setItem('timers', JSON.stringify(timers));
}

function loadTimers() {
  const timersJson = localStorage.getItem('timers');
  
  if (timersJson) {
    timers.splice(0, timers.length, ...JSON.parse(timersJson));
  }
}

function loadId() {
  const id = localStorage.getItem('lastId');

  if (id) {
    lastId = id;
  }
}

function saveId() {
  localStorage.setItem('lastId', lastId);
}


function genId() {
  const id = ++lastId;

  saveId();

  return String(id);
}