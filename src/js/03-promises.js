import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
};

refs.form.addEventListener('submit', handleForm);

function handleForm() {
  event.preventDefault();

  let {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delay = +delay.value;
  step = +step.value;
  amount = +amount.value;

  createPromise(amount, delay, step);
}

function createPromise(position, delay, step) {
  let promiseCount = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      if (promiseCount === position) {
        clearInterval(interval);
        return;
      }

      promiseCount += 1;

      promiseMaker()
        .then((position, delay) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch((position, delay) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, step);
  }, delay);
}

const promiseMaker = () => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve();
    } else {
      reject();
    }
  });
};
