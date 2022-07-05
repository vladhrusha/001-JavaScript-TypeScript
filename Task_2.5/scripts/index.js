const APIkey = '73ff54cf7854273a427a0750b527fac9';
const form = document.querySelector('.form');
form.addEventListener('submit', citySearch);
const table = document.querySelector('table');
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
  console.log(areaCode);
  APIcall = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIkey}`;
  table.innerHTML = '';
  fetchCurrentData(APIcall);

  APIcall2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${areaCode}&limit=1&appid=${APIkey}`;

  fetch(APIcall2)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      APIcall = `https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=hourly, current, minutely, alerts&appid=${APIkey}`;
      fetchForecastData(APIcall);
    });
}

function fetchCurrentData(APIcall) {
  fetch(APIcall)
    .then((response) => response.json())
    .then((data) => {
      let tableRowInfo = {};
      tableRowInfo.weatherMain = data.weather[0].main;
      tableRowInfo.icon = data.weather[0].icon;
      tableRowInfo.temperature = Math.round(data.main.temp);
      tableRowInfo.temperatureFellsLike = Math.round(data.main.feels_like);
      tableRowInfo.city = data.name;
      tableRowInfo.country = data.sys.country;
      composeTable(tableRowInfo, true);
    });
}

function fetchForecastData(APIcall) {
  fetch(APIcall)
    .then((response) => response.json())
    .then((data) => {
      let tableRowInfo = {};
      data.daily.forEach((day, i) => {
        if (i < 5) {
          tableRowInfo.weatherDescription = day.weather[0].description;
          tableRowInfo.weatherMain = day.weather[0].main;
          tableRowInfo.icon = day.weather[0].icon;
          tableRowInfo.temperatureMax = Math.round(day.temp.max);
          tableRowInfo.temperatureMin = Math.round(day.temp.min);
          tableRowInfo.day = new Date(day.dt * 1000).toLocaleString('default', {
            weekday: 'long',
          });
          composeTable(tableRowInfo, false);
        }
      });
    });
}

function composeTable(tableRowInfo, isHead) {
  if (isHead) {
    table.innerHTML += composeTableHead(tableRowInfo);
  } else {
    table.innerHTML += composeTableRow(tableRowInfo);
  }
}

function composeTableHead(tableRowInfo) {
  return `
    <thead class="table__head">
       <tr class="header">
          <th class="th__temperature">
              <h1>${tableRowInfo.temperature}°C</h1>
              <span>Feels like ${tableRowInfo.temperatureFellsLike}°C</span>
         </th>
        <th class="th__2"><h7>${tableRowInfo.weatherMain}</h7> <span>${tableRowInfo.city}, ${tableRowInfo.country}</span></th>
        <th><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></th>
       </tr>
     </thead>`;
}
function composeTableRow(tableRowInfo) {
  return `<tr>
  <td>${tableRowInfo.day}</td>
  <td><img src="http://openweathermap.org/img/wn/${tableRowInfo.icon}@2x.png" alt="${tableRowInfo.weatherMain}"></td>
  <td>${tableRowInfo.weatherDescription}</td>
  <td class="td__temperature">
  <p>${tableRowInfo.temperatureMax}°C</p>
  <p>${tableRowInfo.temperatureMin}°C</p>
  </td>
  </tr>`;
}
