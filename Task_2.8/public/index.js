import furniture from '../data/products.json' assert { type: 'json' };

$('.navigation').load('../markup/nav.html', function () {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach((button) => {
    button.addEventListener('click', onClick);
  });

  const cart = document.querySelector('.cart');
  cart.addEventListener('click', onClickCart);
  loadMain();
});

function onClick(e) {
  let buttonName = e.currentTarget.innerHTML;
  switch (buttonName) {
    case 'Home':
      $('.main').empty();
      loadMain();
      break;
    case 'Products':
      $('.main').empty();
      $('.main').load('../markup/products.html', function () {
        createAllCategories(e);
        const categoryButtons = $('.category');
        categoryButtons[0].addEventListener('click', createAllCategories);
        for (let i = 1; i < categoryButtons.length; i++) {
          categoryButtons[i].addEventListener('click', createCategory);
        }
      });

      break;
    case 'About':
      $('.main').empty();
      $('.main').load('../markup/about.html');
      break;
  }
}

function loadMain() {
  $('.main').load('../markup/home.html', function () {
    createFeatured();
    document.querySelector(
      '.featured'
    ).innerHTML += `<button>ALL PRODUCTS</button>`;
  });
  let nav = document.querySelector('.nav');
  nav.style.backgroundImage = 'url("../images/background.jpg")';
  nav.style.backgroundSize = 'cover';
  nav.style.height = '60vh';
  nav.style.color = 'white';
  nav.innerHTML += `
      <h1>Rest, Relax, Unwind</h1>
      <h2>Embrace your choice - we do</h2>
      <button>SHOP NOW</button>
      `;
}
function onClickCart(e) {
  let asideCart = $('.asideCart');
  asideCart.load('../markup/cart.html', function () {
    const exitButton = document.querySelector('.cart__exit');
    exitButton.addEventListener('click', () => {
      $('.asideCart').empty();
    });
  });
}

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
