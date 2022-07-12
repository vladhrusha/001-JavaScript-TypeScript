import furniture from '../data/products.json' assert { type: 'json' };
import {
  initializeCatalogColumns,
  fillCatalogColumns,
  createCatalogItem,
} from '../scripts/dummyCatalogCreation.js';

function createAllCategories(e) {
  e.preventDefault();
  let allTypesArray = [];
  let allItemsArray = [];
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  initializeCatalogColumns(catalog);

  const categoryTypes = Object.keys(furniture);
  let categoryTypeString;
  let categoryType;
  for (let i = 0; i < categoryTypes.length - 1; i++) {
    categoryTypeString = categoryTypes[i];
    categoryType = furniture[categoryTypeString];
    allTypesArray.push(furniture[categoryTypeString]);
  }

  allTypesArray.forEach((subarray) => {
    subarray.forEach((item) => {
      allItemsArray.push(item);
    });
  });
  localStorage['allItemsArray'] = JSON.stringify(allItemsArray);
  fillCatalogColumns(catalog, allItemsArray);
}

function createCategory(e) {
  e.preventDefault();
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  initializeCatalogColumns(catalog);

  let categoryTypeString = e.currentTarget.innerHTML;
  const furnitureType = furniture[categoryTypeString];
  fillCatalogColumns(catalog, furnitureType);
}

function createFeatured(e) {
  const featured = document.querySelector('.featured');
  const row = featured.querySelector('.row');
  row.innerHTML = '';
  row.innerHTML += createCatalogItem(furniture['Ikea'][0]);
  row.innerHTML += createCatalogItem(furniture['Liddy'][2]);
  row.innerHTML += createCatalogItem(furniture['Marcos'][1]);
}
export { createAllCategories, createCategory, createFeatured };
