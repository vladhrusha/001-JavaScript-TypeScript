import { displayMode, form } from '../public/index.js';

function onClickDisplayMode() {
  const displayModeText = displayMode.querySelector('.span');
  const countries = document.querySelectorAll('.country__information');

  if (displayModeText.innerHTML === 'Dark Mode') {
    displayModeText.innerHTML = 'Light Mode';
    displayMode.querySelector('.image').src = '../images/light.png';
  } else {
    displayModeText.innerHTML = 'Dark Mode';
    displayMode.querySelector('.image').src = '../images/dark.png';
  }

  document.body.classList.toggle('darkMode__body');
  countries.forEach((country) => {
    country.classList.toggle('darkMode__element');
  });
  form.querySelector('.textInput').classList.toggle('darkMode__element');
  form.querySelector('.inputSelect').classList.toggle('darkMode__element');
  form.querySelector('.select').classList.toggle('darkMode__element');
  form
    .querySelector('.select')
    .classList.toggle('darkMode__element::placeholder');
}

export { onClickDisplayMode };
