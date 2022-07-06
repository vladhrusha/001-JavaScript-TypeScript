const APIkey = '73ff54cf7854273a427a0750b527fac9';
const form = document.querySelector('.form');
const table = document.querySelector('table');
form.addEventListener('submit', citySearch);

citySearch();

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       let location = position.coords;
//     });
// }

function citySearch(event) {
  if (event) {
    event.preventDefault();
  }
  let input = form.search.value;
  let inputArray = input.split(', ');
  let city = inputArray[0];
  let areaCode = inputArray[1];
  document.querySelector('.label--selected').innerHTML = `Selected: ${city}`;
  currentWeatherAPIcall = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;
  table.innerHTML = '';
  fetchCurrentData(currentWeatherAPIcall);

  geocodingAPIcall = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${areaCode}&limit=1&appid=${APIkey}`;

  fetch(geocodingAPIcall)
    .then((response) => response.json())
    .then((geolocationData) => {
      let lat = geolocationData[0].lat;
      let lon = geolocationData[0].lon;
      oneAPIcall = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly, current, minutely, alerts&appid=${APIkey}`;
      fetchForecastData(oneAPIcall);
    });
}

function fetchCurrentData(currentWeatherAPIcall) {
  fetch(currentWeatherAPIcall)
    .then((response) => response.json())
    .then((currentWeatherData) => {
      let tableRowInfo = {};
      tableRowInfo.weatherMain = currentWeatherData.weather[0].main;
      tableRowInfo.icon = currentWeatherData.weather[0].icon;
      tableRowInfo.temperature = Math.round(currentWeatherData.main.temp);
      tableRowInfo.temperatureFellsLike = Math.round(
        currentWeatherData.main.feels_like
      );
      tableRowInfo.city = currentWeatherData.name;
      tableRowInfo.country = currentWeatherData.sys.country;
      composeTable(tableRowInfo, true);
    });
}

function fetchForecastData(oneAPIcall) {
  fetch(oneAPIcall)
    .then((response) => response.json())
    .then((forecastData) => {
      let tableRowInfo = {};
      let tableBody = '';
      forecastData.daily.forEach((day, i) => {
        if (i < 5) {
          tableRowInfo.weatherDescription = day.weather[0].description;
          tableRowInfo.weatherMain = day.weather[0].main;
          tableRowInfo.icon = day.weather[0].icon;
          tableRowInfo.temperatureMax = Math.round(day.temp.max);
          tableRowInfo.temperatureMin = Math.round(day.temp.min);
          tableRowInfo.day = new Date(day.dt * 1000).toLocaleString('default', {
            weekday: 'long',
          });
          if (i == 0) {
            tableBody += `<tbody>`;
          }
          tableBody += composeTable(tableRowInfo, false);
          if (i == 4) {
            tableBody += `</tbody>`;
          }
        }
      });
      table.innerHTML += tableBody;
    });
}

function composeTable(tableRowInfo, isHead) {
  if (isHead) {
    table.innerHTML += composeTableHead(tableRowInfo);
  } else {
    return composeTableBodyRow(tableRowInfo);
  }
}

function composeTableHead(tableRowInfo) {
  return `
    <thead class="table__head">
       <tr class="header">
          <th class="th th__temperature">
              <h1 class="thermometer__temperature">${tableRowInfo.temperature}°C</h1>
              <span>Feels like ${tableRowInfo.temperatureFellsLike}°C</span>
         </th>
        <th class="th th__2"><h3>${tableRowInfo.weatherMain}</h3> <span>${tableRowInfo.city}, ${tableRowInfo.country}</span></th>
        <th class="th"><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></th>
       </tr>
     </thead>`;
}
function composeTableBodyRow(tableRowInfo) {
  return `<tr class="body__row">
  <td class="td td__day">${tableRowInfo.day}</td>
  <td class="td"><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></td>
  <td class="td">${tableRowInfo.weatherDescription}</td>
  <td class="td td__temperature">
  <span>${tableRowInfo.temperatureMax}°C</span>
  <span>${tableRowInfo.temperatureMin}°C</span>
  </td>
  </tr>`;
}
