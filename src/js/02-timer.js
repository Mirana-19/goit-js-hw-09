import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

let pickedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      window.alert('Please choose a date in the future');

      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }

    pickedDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', handleTimer);

function handleTimer() {
  const intervalId = setInterval(() => {
    const deltaTime = pickedDate - Date.now();
    const timeLeft = convertMs(deltaTime);
    updateTimer(timeLeft);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = days;
  refs.hoursTimer.textContent = hours;
  refs.minutesTimer.textContent = minutes;
  refs.secondsTimer.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
