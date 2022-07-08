import { displayList } from '../src/createList.js';
import { onClickDisplayMode } from '../src/darkMode.js';
import { onSelect, onSearchTextEnter } from '../src/inputMethods.js';

const displayMode = document.querySelector('.displayMode');
const countriesList = document.querySelector('.list');
const form = document.querySelector('.nav__form');
const filterSelect = form.querySelector('.filterSelect');
const API_URL = 'https://restcountries.com/v3.1/';

displayMode
  .querySelector('.image')
  .addEventListener('click', onClickDisplayMode);
form
  .querySelector('.countryInput')
  .addEventListener('keyup', onSearchTextEnter);
filterSelect.addEventListener('change', onSelect);

displayList('all');

export { displayMode, countriesList, form, filterSelect, API_URL };
