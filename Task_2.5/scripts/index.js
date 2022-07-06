const form = document.querySelector('.form');
const table = document.querySelector('table');
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
  ).innerHTML = `Selected: ${city}, ${areaCode}`;

  table.innerHTML = '';
  //add current weather
  fetchCurrentData(currentWeatherAPIcall);
  //add forecast
  fetch(geocodingAPIcall)
    .then((response) => response.json())
    .then((geolocationData) => {
      let lat = geolocationData[0].lat;
      let lon = geolocationData[0].lon;
      const oneAPIcall = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly, current, minutely, alerts&appid=${APIkey}`;
      fetchForecastData(oneAPIcall);
    })
    .catch((error) => {
      alert('Invalid City');
    });
}

function fetchCurrentData(currentWeatherAPIcall) {
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
      let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      tableRowData.country = regionNames.of(currentWeatherData.sys.country);
      addTableHead(tableRowData);
    });
}

function fetchForecastData(oneAPIcall) {
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

function addTableHead(tableRowData) {
  table.innerHTML += `
    <thead class="table__head">
       <tr class="header__row">
          <th class="th th__temp">
              <h1 class="thermometer__temp">${tableRowData.temperature}°C</h1>
              <span>Feels like ${tableRowData.temperatureFellsLike}°C</span>
         </th>
        <th class="th"><h3>${tableRowData.weatherMain}</h3> <span>${tableRowData.city}, ${tableRowData.country}</span></th>
        <th class="th"><img src="http://openweathermap.org/img/wn/${tableRowData.icon}@2x.png" alt="${tableRowData.weatherMain}"></th>
       </tr>
     </thead>`;
}
function addTableBodyRow(tableRowData) {
  return `<tr class="body__row">
  <td class="td td__day">${tableRowData.day}</td>
  <td class="td"><img src="http://openweathermap.org/img/wn/${tableRowData.icon}@2x.png" alt="${tableRowData.weatherMain}"></td>
  <td class="td">${tableRowData.weatherDescription}</td>
  <td class="td td__temp">
  <span>${tableRowData.temperatureMax}°C</span>
  <span>${tableRowData.temperatureMin}°C</span>
  </td>
  </tr>`;
}
