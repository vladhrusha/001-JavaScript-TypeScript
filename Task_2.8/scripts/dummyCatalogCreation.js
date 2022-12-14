import { getAddedItem } from './cart.js';

function initializeCatalogColumns(catalog) {
  for (let i = 0; i < 3; i++) {
    catalog.innerHTML += '<div class="catalog__column">';
  }
}

function fillCatalogColumns(catalog, furnitureType) {
  const catalogColumns = catalog.querySelectorAll('.catalog__column');
  for (let j = 0; j < catalogColumns.length; j++) {
    for (let i = j; i < furnitureType.length; i += catalogColumns.length) {
      catalogColumns[j].innerHTML += createCatalogItem(furnitureType[i]);
    }
  }
  let cartButtons = $('.cartAdd');
  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener('click', getAddedItem);
  }
}

function createCatalogItem(item) {
  return `
  <article class="item">
	<img class="item__image" src="${item.imageURL}" />
	<span class="item__name">${item.name}</span>
  <div class='priceAndCart'>
	<h5>${item.price}</h5>
  <h5 class='cartAdd'>Add to Cart</h5>
  </div>
	</article>`;
}

export {
  initializeCatalogColumns,
  fillCatalogColumns,
  createCatalogItem,
  getAddedItem,
};
