import { displayList } from '../src/createList.js';
import { onClickDisplayMode } from '../src/darkMode.js';
import { onSelect, onSearchTextInput } from '../src/inputMethods.js';

const displayMode = document.querySelector('.displayMode');
const countriesList = document.querySelector('.list');
const form = document.querySelector('.nav__form');
const select = form.querySelector('.select');
const API_URL = 'https://restcountries.com/v3.1/';
displayMode
  .querySelector('.image')
  .addEventListener('click', onClickDisplayMode);
form.querySelector('.textInput').addEventListener('keyup', onSearchTextInput);
select.addEventListener('change', onSelect);

displayList('all', true);

export { displayMode, countriesList, form, select, API_URL };
