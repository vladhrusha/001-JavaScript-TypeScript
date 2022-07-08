let row;
import { countriesList, API_URL } from '../public/index.js';
import { quickSort } from './sorting.js';

async function displayList(queryValue) {
  let darkMode = '';

  if (countriesList.querySelector('.darkMode__element')) {
    darkMode = 'darkMode__element';
  }
  countriesList.innerHTML = '';
  const countries = await getCountries(queryValue);
  quickSort(countries);
  countries.forEach((country, index) => {
    const countryObject = {
      name: country.name.common,
      population: country.population,
      capital: country.capital,
      region: country.region,
      flag: country.flags.png,
    };
    composeCountryRow(countryObject, index, 4, darkMode);
  });
}

function composeCountryRow(country, index, columnNumber, darkMode) {
  if (index % columnNumber == 0) {
    row = '<section class="list__row">';
  }
  row += composeCountryItem(country, darkMode);
  if (index % columnNumber == columnNumber - 1) {
    row += `</section>`;
    countriesList.innerHTML += row;
  }
}

function composeCountryItem(country, darkMode) {
  return `
    <article class="country ${darkMode}">
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
}

async function getCountries(queryValue) {
  try {
    console.log(`${API_URL}${queryValue}`);
    let response = await fetch(`${API_URL}${queryValue}`);
    if (!response.ok) {
      throw Error();
    }
    return await response.json();
  } catch (err) {
    alert('invalid filter input');
  }
}

export { displayList, getCountries };
