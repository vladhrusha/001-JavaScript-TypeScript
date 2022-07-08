let row;
import { countriesList, API_URL } from '../public/index.js';
import { selectionSort } from './sorting.js';
import { onSearchTextInput } from './inputMethods.js';

async function displayList(queryValue, frequentUpdate) {
  let darkModeEnabled = false;

  if (countriesList.querySelector('.darkMode__element')) {
    darkModeEnabled = true;
  }
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
      darkMode: darkModeEnabled,
    };
    composeCountryRow(countryObject, index, 4);
  });
}

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
  let darkModeClass = '';
  if (country.darkMode) {
    darkModeClass = 'darkMode__element';
  }
  item += `
    <article class="country ${darkModeClass}">
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

export { displayList, getCountries, onSearchTextInput };
