import { displayMode } from '../public/index.js';
function onClickDisplayMode() {
  const displayModeText = displayMode.querySelector('.span');

  if (displayModeText.innerHTML === 'Dark Mode') {
    displayModeText.innerHTML = 'Light Mode';
    displayMode.querySelector('.image').src = '../images/light.png';
  } else {
    displayModeText.innerHTML = 'Dark Mode';
    displayMode.querySelector('.image').src = '../images/dark.png';
  }
  document.body.classList.toggle('dark');
}
export { onClickDisplayMode };
