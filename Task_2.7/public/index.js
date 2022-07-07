const displayMode = document.querySelector('.displayMode');
const countriesList = document.querySelector('.list');
const form = document.querySelector('.nav__form');
const select = form.querySelector('.select');
const API_URL = 'https://restcountries.com/v3.1/';
displayMode
  .querySelector('.image')
  .addEventListener('click', onClickDisplayMode);
form
  .querySelector('.textInput')
  .addEventListener('keypress', onSearchTextInput);
select.addEventListener('change', onSelect);

displayList('all', true);

function onClickDisplayMode() {
  const displayModeText = displayMode.querySelector('.span');
  const countries = document.querySelectorAll('.country');

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

function onSearchTextInput(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    return false;
  }
  const filterValue = form.querySelector('.textInput').value;
  console.log(filterValue);
  displayList('name/' + filterValue, true);
  console.log('key pressed');
}

async function displayList(queryValue, frequentUpdate) {
  countriesList.innerHTML = '';
  const countries = await getCountries(queryValue, frequentUpdate);
  selectionSort(countries);
  countries.forEach((country, index) => {
    const countryObject = {
      name: country.name.common,
      population: country.population,
      capital: country.capital,
      region: country.region,
      flag: country.flags.png,
    };
    composeCountryRow(countryObject, index, 4);
  });
}

async function getCountries(queryValue, frequentUpdate) {
  try {
    let response = await fetch(`${API_URL}${queryValue}`);
    if (!response.ok) {
      throw Error();
    }
    return await response.json();
  } catch (err) {
    if (!frequentUpdate) {
      alert('invalid filter input');
    }
  }
}
let row;
function composeCountryRow(country, index, columnNumber) {
  if (index % columnNumber == 0) {
    row = '<section class="list__row">';
  }
  row += composeCountryItem(country);
  if (index % columnNumber == columnNumber - 1) {
    row += `</section>`;
    countriesList.innerHTML += row;
  }
}

function composeCountryItem(country) {
  let item = '';

  item += `
    <article class="country">
	<img class="country__flag" src="${country.flag}" />
	<div class="country__information">
	<h4 class="h4 name">${country.name}</h4>
	<span">
	<span>Population: </span>
	<span class="span population">${country.population}</span>
	</span>
    </br>
	<span>
	<span>Region: </span><span class="span region">${country.region}</span>
	</span>
    </br>
	<span>
	<span>Capital: </span><span class="span capital">${country.capital}</span>
	</span>
	</div>
	</article>
    `;

  return item;
}
function selectionSort(countries) {
  let min;

  for (let i = 0; i < countries.length; i++) {
    min = i;

    for (let j = i + 1; j < countries.length; j++) {
      if (countries[j].name.common < countries[min].name.common) {
        min = j;
      }
    }

    if (min !== i) {
      [countries[i], countries[min]] = [countries[min], countries[i]];
    }
  }

  return countries;
}

function quickSort(array) {
  executeQuickSort(array, 0, array.length - 1);
}
function executeQuickSort(array, left, right) {
  let index;

  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      executeQuickSort(array, left, index - 1);
    }

    if (index < right) {
      executeQuickSort(array, index, right);
    }
  }
  return array;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)],
    i = left,
    j = right;

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }

    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];

      i++;
      j--;
    }
  }
  return i;
}
