import { form, select } from '../public/index.js';
import { displayList } from '../src/createList.js';

function onSearchTextInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const filterValue = form.querySelector('.textInput').value;
    displayList('name/' + filterValue);
    form.querySelector('.textInput').value = '';
  }
}
function onSelect() {
  const filterValue = form.querySelector('.inputSelect').value;
  const selectOption = select.options[select.selectedIndex].value;
  if (selectOption === 'Filter by none') {
    displayList('all');
  }
  if (selectOption === 'Filter by Region') {
    displayList('region/' + filterValue);
  }
  form.querySelector('.inputSelect').value = '';
}
export { onSearchTextInput, onSelect };
