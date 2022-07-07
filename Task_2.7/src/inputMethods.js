import { form, select } from '../public/index.js';
import { displayList } from '../src/createList.js';

function onSearchTextInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    return false;
  }
  const filterValue = form.querySelector('.textInput').value;
  console.log(filterValue);
  displayList('name/' + filterValue, true);
  console.log('key pressed');
  console.log('name/' + filterValue);
}
function onSelect() {
  const filterValue = form.querySelector('.inputSelect').value;
  const selectOption = select.options[select.selectedIndex].value;
  if (selectOption === 'Filter by none') {
    displayList('all', false);
  }
  if (selectOption === 'Filter by Region') {
    displayList('region/' + filterValue, false);
  }
  form.querySelector('.inputSelect').value = '';
}
export { onSearchTextInput, onSelect };
