let row;
import { countriesList, form } from '../public/index.js';
import { compareName } from './utils.js';

async function displayList(queryValue) {
  const loader = form.querySelector('.loader');
  loader.style.display = 'block';
  countriesList.innerHTML = '';
  const countries = await getCountries(queryValue);
  countries.sort(compareName);
  countries.forEach((country, index) => {
    const countryObject = {
      name: country.name.common,
      population: country.population,
      capital: country.capital,
      region: country.region,
      flag: country.flags.png,
    };
    composeCountryRow(countryObject, index, 4, countries.length);
  });
  loader.style.display = 'none';

  if (countriesList.innerHTML === '') {
    countriesList.innerHTML =
      'The server has not found anything matching your request';
  }
}

function composeCountryRow(country, index, columnNumber, length) {
  if (index % columnNumber == 0) {
    row = '<section class="list__row">';
  }
  row += composeCountryItem(country);
  if (
    index % columnNumber == columnNumber - 1 ||
    (index == length - 1 && index % columnNumber != columnNumber - 1)
  ) {
    row += `</section>`;
    countriesList.innerHTML += row;
  }
}

function composeCountryItem(country) {
  return `
    <article class="country ">
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
  const API_URL = 'https://restcountries.com/v3.1/';

  try {
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
