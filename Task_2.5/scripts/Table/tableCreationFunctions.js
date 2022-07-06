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
function addTableHead(tableRowData) {
  return `
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
export { addTableBodyRow, addTableHead };
