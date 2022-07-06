import {
  addTableBodyRow,
  addTableHead,
} from '../Table/tableCreationFunctions.js';

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function addCurrentWeather(currentWeatherAPIcall, table) {
  fetch(currentWeatherAPIcall)
    .then((response) => response.json())
    .then((currentWeatherData) => {
      let tableRowData = {};
      tableRowData.weatherMain = currentWeatherData.weather[0].main;
      tableRowData.icon = currentWeatherData.weather[0].icon;
      tableRowData.temperature = Math.round(currentWeatherData.main.temp);
      tableRowData.temperatureFellsLike = Math.round(
        currentWeatherData.main.feels_like
      );
      tableRowData.city = currentWeatherData.name;
      tableRowData.country = regionNames.of(currentWeatherData.sys.country);
      table.innerHTML += addTableHead(tableRowData);
    });
}

function addForecast(oneAPIcall, table) {
  fetch(oneAPIcall)
    .then((response) => response.json())
    .then((forecastData) => {
      let tableRowData = {};
      let tableBody = `<tbody>`;
      forecastData.daily.forEach((day, i) => {
        if (i < 5) {
          tableRowData.weatherDescription = day.weather[0].description;
          tableRowData.weatherMain = day.weather[0].main;
          tableRowData.icon = day.weather[0].icon;
          tableRowData.temperatureMax = Math.round(day.temp.max);
          tableRowData.temperatureMin = Math.round(day.temp.min);
          tableRowData.day = new Date(day.dt * 1000).toLocaleString('default', {
            weekday: 'short',
          });
          tableBody += addTableBodyRow(tableRowData);
        }
      });

      tableBody += `</tbody>`;
      table.innerHTML += tableBody;
    });
}

export { addCurrentWeather, addForecast };
