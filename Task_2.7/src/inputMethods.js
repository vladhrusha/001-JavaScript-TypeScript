import { form, filterSelect } from '../public/index.js';
import { displayList } from '../src/createList.js';
import { isEmptyOrWhitespaceOnly } from './utils.js';

function onSearchTextEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const inputValue = form.querySelector('.countryInput').value;
    if (isEmptyOrWhitespaceOnly(inputValue)) {
      return;
    }
    displayList('name/' + inputValue);
    form.querySelector('.countryInput').value = '';
  }
}
function onSelect() {
  const filterValue = form.querySelector('.filterInput').value;
  const selectOption = filterSelect.options[filterSelect.selectedIndex].value;

  if (
    isEmptyOrWhitespaceOnly(filterValue) &&
    selectOption !== 'Filter by none'
  ) {
    return;
  }

  switch (selectOption) {
    case 'Filter by none':
      displayList('all');
      break;
    case 'Filter by Region':
      displayList('region/' + filterValue);
      break;
  }
  form.querySelector('.filterInput').value = '';
}
export { onSearchTextEnter, onSelect };
