import { displayMode, form, countriesList } from '../public/index.js';
function onClickDisplayMode() {
  const displayModeText = displayMode.querySelector('.span');
  const countriesItems = countriesList.querySelectorAll('.country');

  if (displayModeText.innerHTML === 'Dark Mode') {
    displayModeText.innerHTML = 'Light Mode';
    displayMode.querySelector('.image').src = '../images/light.png';
  } else {
    displayModeText.innerHTML = 'Dark Mode';
    displayMode.querySelector('.image').src = '../images/dark.png';
  }
  document.body.classList.toggle('dark-theme');
}
export { onClickDisplayMode };
