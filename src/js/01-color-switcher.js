import '../css/common.css';

const backgroundBody = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let timeId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', onStartColor);
buttonStop.addEventListener('click', onStopColor);

function onStartColor() {
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
  timeId = setInterval(() => {
    backgroundBody.style.background = getRandomHexColor();
  }, 1000);
}

function onStopColor() {
  buttonStop.setAttribute('disabled', true);
  buttonStart.removeAttribute('disabled');
  clearInterval(timeId);
}
