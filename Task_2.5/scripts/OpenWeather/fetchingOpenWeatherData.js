import {
  addTableBodyRow,
  addTableHead,
} from '../Table/tableCreationFunctions.js';

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

async function addCurrentWeather(currentWeatherURL, table) {
  let response = await fetch(currentWeatherURL);
  let currentWeatherData = await response.json();

  const tableRowData = {
    weatherMain: currentWeatherData.weather[0].main,
    icon: currentWeatherData.weather[0].icon,
    temperature: Math.round(currentWeatherData.main.temp),
    temperatureFellsLike: Math.round(currentWeatherData.main.feels_like),
    city: currentWeatherData.name,
    country: regionNames.of(currentWeatherData.sys.country),
  };

  table.innerHTML += addTableHead(tableRowData);
}

async function insertForecast(oneCallURL, table) {
  let response = await fetch(oneCallURL);
  let forecastData = await response.json();

  let tableBody = `<tbody>`;
  forecastData.daily.forEach((day, i) => {
    if (i < 5) {
      const tableRowData = {
        weatherDescription: day.weather[0].description,
        weatherMain: day.weather[0].main,
        icon: day.weather[0].icon,
        temperatureMax: Math.round(day.temp.max),
        temperatureMin: Math.round(day.temp.min),
        day: new Date(day.dt * 1000).toLocaleString('default', {
          weekday: 'short',
        }),
      };

      tableBody += addTableBodyRow(tableRowData);
    }
  });
  table.innerHTML += tableBody;
  tableBody += `</tbody>`;
}

export { addCurrentWeather, insertForecast };
