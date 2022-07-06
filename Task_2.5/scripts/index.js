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
      let tableRowInfo = {};
      tableRowInfo.weatherMain = currentWeatherData.weather[0].main;
      tableRowInfo.icon = currentWeatherData.weather[0].icon;
      tableRowInfo.temperature = Math.round(currentWeatherData.main.temp);
      tableRowInfo.temperatureFellsLike = Math.round(
        currentWeatherData.main.feels_like
      );
      tableRowInfo.city = currentWeatherData.name;
      tableRowInfo.country = currentWeatherData.sys.country;
      addTableHead(tableRowInfo);
    });
}

function fetchForecastData(oneAPIcall) {
  fetch(oneAPIcall)
    .then((response) => response.json())
    .then((forecastData) => {
      let tableRowInfo = {};
      let tableBody = `<tbody>`;
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
          tableBody += addTableBodyRow(tableRowInfo);
        }
      });

      tableBody += `</tbody>`;
      table.innerHTML += tableBody;
    });
}

function addTableHead(tableRowInfo) {
  table.innerHTML += `
    <thead class="table__head">
       <tr class="header__row">
          <th class="th th__temp">
              <h1 class="thermometer__temp">${tableRowInfo.temperature}°C</h1>
              <span>Feels like ${tableRowInfo.temperatureFellsLike}°C</span>
         </th>
        <th class="th"><h3>${tableRowInfo.weatherMain}</h3> <span>${tableRowInfo.city}, ${tableRowInfo.country}</span></th>
        <th class="th"><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></th>
       </tr>
     </thead>`;
}
function addTableBodyRow(tableRowInfo) {
  return `<tr class="body__row">
  <td class="td td__day">${tableRowInfo.day}</td>
  <td class="td"><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></td>
  <td class="td">${tableRowInfo.weatherDescription}</td>
  <td class="td td__temp">
  <span>${tableRowInfo.temperatureMax}°C</span>
  <span>${tableRowInfo.temperatureMin}°C</span>
  </td>
  </tr>`;
}
