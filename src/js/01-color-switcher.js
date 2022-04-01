function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', () => {
  changeBgColor.start();
});

refs.stopBtn.addEventListener('click', () => {
  changeBgColor.stop();
});

const changeBgColor = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.stopBtn.disabled = false;
    refs.startBtn.disabled = true;
  },

  stop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;

    clearInterval(this.intervalId);
  },
};
