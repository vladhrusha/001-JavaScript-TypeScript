import {
  addCurrentWeather,
  insertForecast,
} from './OpenWeather/fetchingOpenWeatherData.js';
import { APIkey, API_URL } from './fetchData.js';

const form = document.querySelector('.form');
form.addEventListener('submit', citySearch);
const table = document.querySelector('table');

citySearch();

function citySearch(event) {
  if (event) {
    event.preventDefault();
  }

  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  let hasNumber = /\d/;
  let input = '';
  if (!hasNumber.test(form.search.value)) {
    input = form.search.value.split(', ');
  }
  let city = input[0];
  let areaCode = input[1];

  const currentWeatherURL = `${API_URL}/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;
  const geocodingURL = `${API_URL}/geo/1.0/direct?q=${city},${areaCode}&limit=1&appid=${APIkey}`;

  if (typeof areaCode === 'string' && areaCode.length == 2) {
    document.querySelector(
      '.nav__label'
    ).innerHTML = `Selected: ${city}, ${regionNames.of(areaCode)}`;
  }

  table.innerHTML = '';
  //add current weather
  addCurrentWeather(currentWeatherURL, table);
  //add forecast
  addForecast(geocodingURL, API_URL, APIkey);
}

async function addForecast(geocodingURL, API_URL, APIkey) {
  let response = await fetch(geocodingURL);
  let geolocationData = await response.json();

  let lat = geolocationData[0].lat;
  let lon = geolocationData[0].lon;
  const oneCallURL = `${API_URL}/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly, current, minutely, alerts&appid=${APIkey}`;
  insertForecast(oneCallURL, table);
}
