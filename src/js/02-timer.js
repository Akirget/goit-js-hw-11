import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let timeId = null;
buttonStart.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addTime = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStart.removeAttribute('disabled');

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      const difference = selectData - now;
      const { days, hours, minutes, seconds } = convertMs(difference);
      daysRef.textContent = addTime(days);
      hoursRef.textContent = addTime(hours);
      minutesRef.textContent = addTime(minutes);
      secondsRef.textContent = addTime(seconds);

      if (
        daysRef.textContent === '00' &&
        hoursRef.textContent === '00' &&
        minutesRef.textContent === '00' &&
        secondsRef.textContent === '00'
      ) {
        clearInterval(timeId);
      }
    };

    const onClick = () => {
      if (timeId) {
        clearInterval(timeId);
      }
      showTimer();
      timeId = setInterval(showTimer, 1000);
    };

    buttonStart.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', options);
