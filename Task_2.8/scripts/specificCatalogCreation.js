import furniture from '../data/products.json' assert { type: 'json' };
import {
  initializeCatalogColumns,
  fillCatalogColumns,
  createItem,
} from '../scripts/dummyCatalogCreation.js';
function createAllCategories(e) {
  e.preventDefault();
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  initializeCatalogColumns(catalog);

  const categoryTypes = Object.keys(furniture);
  let categoryTypeString;
  let categoryType;
  for (let i = 0; i < categoryTypes.length - 1; i++) {
    categoryTypeString = categoryTypes[i];
    categoryType = furniture[categoryTypeString];
    fillCatalogColumns(catalog, categoryType);
  }
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
  row.innerHTML += createItem(furniture['Ikea'][0]);
  row.innerHTML += createItem(furniture['Liddy'][2]);
  row.innerHTML += createItem(furniture['Marcos'][1]);
}
export { createAllCategories, createCategory, createFeatured };
