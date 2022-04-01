import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
};

refs.form.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();

  let {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const promiseParams = convertToNumber(amount, delay, step);
  createPromise(promiseParams);

  refs.form.reset();
}

function createPromise({ amount, delay, step }) {
  let promiseCount = 0;

  if (amount < 0 || delay < 0 || step < 0) {
    return Notify.failure('Please, choose a positive value');
  }

  setTimeout(() => {
    const interval = setInterval(() => {
      if (promiseCount === amount) {
        clearInterval(interval);
        return;
      }

      promiseCount += 1;

      promiseMaker()
        .then((amount, delay) => {
          Notify.success(`✅ Fulfilled promise ${amount} in ${delay}ms`);
        })
        .catch((amount, delay) => {
          Notify.failure(`❌ Rejected promise ${amount} in ${delay}ms`);
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

function convertToNumber(amount, delay, step) {
  return {
    delay: +delay.value,
    step: +step.value,
    amount: +amount.value,
  };
}
