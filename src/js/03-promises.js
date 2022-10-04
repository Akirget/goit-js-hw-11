import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
console.log();
let delay = null;
let step = null;
let amount = null;

formEl.addEventListener('submit', onFormElPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormElPromise(event) {
  event.preventDefault();

  delay = Number(event.currentTarget.delay.value);
  amount = Number(event.currentTarget.amount.value);
  step = Number(event.currentTarget.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
