function initializeCatalogColumns(catalog) {
  for (let i = 0; i < 3; i++) {
    catalog.innerHTML += '<div class="catalog__column">';
  }
}

function fillCatalogColumns(catalog, furnitureType) {
  const catalogColumns = catalog.querySelectorAll('.catalog__column');
  for (let j = 0; j < catalogColumns.length; j++) {
    for (let i = j; i < furnitureType.length; i += catalogColumns.length) {
      catalogColumns[j].innerHTML += createItem(furnitureType[i]);
    }
  }
}

function createItem(item) {
  return `
  <article class="item">
	<img class="item__image" src="${item.imageURL}" />
	<span>${item.name}</span>
	<h6>${item.price}</h6>
	</article>`;
}

export { initializeCatalogColumns, fillCatalogColumns, createItem };
