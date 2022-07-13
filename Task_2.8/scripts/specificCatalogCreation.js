import furniture from '../data/products.json' assert { type: 'json' };
import {
  initializeCatalogColumns,
  fillCatalogColumns,
  createCatalogItem,
} from '../scripts/dummyCatalogCreation.js';

import { getAllItems, sliderHandler } from './utils.js';

let allItemsArray = getAllItems();

function createAllCategories(e) {
  e.preventDefault();
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  initializeCatalogColumns(catalog);

  localStorage['allItemsArray'] = JSON.stringify(allItemsArray);
  let finalArray = sliderHandler(allItemsArray);

  fillCatalogColumns(catalog, finalArray);
}

function createSearched(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    let searchInput = e.currentTarget.value.toLowerCase();
    const catalog = document.querySelector('.catalog');
    catalog.innerHTML = '';

    initializeCatalogColumns(catalog);

    let searchedItemsArray = [];

    allItemsArray.forEach((item) => {
      let text = item.name.toLowerCase();
      if (item.name.toLowerCase().includes(searchInput)) {
        searchedItemsArray.push(item);
      }
    });
    let finalArray = sliderHandler(searchedItemsArray);
    fillCatalogColumns(catalog, finalArray);
  }
}

function createCategory(e) {
  e.preventDefault();
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  initializeCatalogColumns(catalog);

  let categoryTypeString = e.currentTarget.innerHTML;
  const furnitureType = furniture[categoryTypeString];
  let finalArray = sliderHandler(furnitureType);
  fillCatalogColumns(catalog, finalArray);
}

function createFeatured(e) {
  const featured = document.querySelector('.featured');
  const row = document.querySelector('.row');
  row.innerHTML = '';
  row.innerHTML += createCatalogItem(furniture['Ikea'][0]);
  row.innerHTML += createCatalogItem(furniture['Liddy'][2]);
  row.innerHTML += createCatalogItem(furniture['Marcos'][1]);

  // let cartButtons = document.querySelectorAll('.item__image');
  // console.log(cartButtons);
  // cartButtons.forEach((button) => {
  //   console.log(button);
  //   button.addEventListener('click', kek);
  //   button.click();
  // });
}
// function kek() {
//   console.log('lol');
// }

export { createAllCategories, createCategory, createFeatured, createSearched };
