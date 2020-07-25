let isConnected = false;

const connection = io('http://localhost:3000');

connection.on('connect', () => {
  isConnected = true;
});
connection.on('disconnect', () => {
  isConnected = false;
});

let state = {
  r: false,
  g: false,
  b: false
};

const emitRgbEvent = event => {
  if (!isConnected) {
    return alert('Connection closed!');
  }

  if (event.target.id === 'btn-r') {
    state.r = !state.r;
  }
  if (event.target.id === 'btn-g') {
    state.g = !state.g;
  }
  if (event.target.id === 'btn-b') {
    state.b = !state.b;
  }
  connection.emit('dial-led', state);
};

const btnR = document.getElementById('btn-r');
const btnG = document.getElementById('btn-g');
const btnB = document.getElementById('btn-b');

btnR.addEventListener('click', emitRgbEvent);
btnG.addEventListener('click', emitRgbEvent);
btnB.addEventListener('click', emitRgbEvent);