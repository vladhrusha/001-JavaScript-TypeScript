// let row;
// function composeCountryRow(country, index, columnNumber) {
//   if (index % columnNumber == 0) {
//     row = '<section class="list__row">';
//   }
//   row += composeCountryItem(country);
//   if (index % columnNumber == columnNumber - 1) {
//     row += `</section>`;
//     countriesList.innerHTML += row;
//   }
// }

// function composeCountryItem(country) {
//   let item = '';

//   item += `
//     <article class="country">
// 	<img class="country__flag" src="${country.flag}" />
// 	<div class="country__information">
// 	<h4 class="h4 name">${country.name}</h4>
// 	<span">
// 	<span>Population: </span>
// 	<span class="span population">${country.population}</span>
// 	</span>
//     </br>
// 	<span>
// 	<span>Region: </span><span class="span region">${country.region}</span>
// 	</span>
//     </br>
// 	<span>
// 	<span>Capital: </span><span class="span capital">${country.capital}</span>
// 	</span>
// 	</div>
// 	</article>
//     `;

//   return item;
// }
// export { composeCountryRow, composeCountryItem };
