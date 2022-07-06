import {
  addCurrentWeather,
  addForecast,
} from './OpenWeather/fetchingOpenWeatherData.js';
const form = document.querySelector('.form');
const table = document.querySelector('table');
let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
form.addEventListener('submit', citySearch);

citySearch();

function citySearch(event) {
  if (event) {
    event.preventDefault();
  }

  let input = form.search.value.split(', ');
  let city = input[0];
  let areaCode = input[1];
  const APIkey = '73ff54cf7854273a427a0750b527fac9';
  const currentWeatherAPIcall = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;
  const geocodingAPIcall = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${areaCode}&limit=1&appid=${APIkey}`;

  document.querySelector(
    '.nav__label'
  ).innerHTML = `Selected: ${city}, ${regionNames.of(areaCode)}`;

  table.innerHTML = '';
  //add current weather
  addCurrentWeather(currentWeatherAPIcall);
  //add forecast
  fetch(geocodingAPIcall)
    .then((response) => response.json())
    .then((geolocationData) => {
      let lat = geolocationData[0].lat;
      let lon = geolocationData[0].lon;
      const oneAPIcall = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly, current, minutely, alerts&appid=${APIkey}`;
      addForecast(oneAPIcall);
    })
    .catch((error) => {
      alert('Invalid City');
    });
}
