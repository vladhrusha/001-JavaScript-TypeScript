import {
  createAllCategories,
  createCategory,
  createFeatured,
  createSearched,
} from './specificCatalogCreation.js';

function loadHomePage() {
  let nav = $('.navigation');
  nav.addClass('navHome');

  $('.main').empty();
  $('.main').load('../markup/home.html', function () {
    createFeatured();

    document.querySelector(
      '.featured'
    ).innerHTML += `<button class="productLink">ALL PRODUCTS</button>`;
    let allProductsButton = document.querySelector('.productLink');
    allProductsButton.addEventListener('click', loadProductsPage);
  });
}

function loadProductsPage() {
  let nav = $('.navigation');
  nav.removeClass('navHome');
  document.querySelector('.title').innerHTML = 'Home / Products';

  $('.main').empty();
  $('.main').load('../markup/products.html', function () {
    const categoryButtons = $('.category');
    categoryButtons[0].addEventListener('click', createAllCategories);
    for (let i = 1; i < categoryButtons.length; i++) {
      categoryButtons[i].addEventListener('click', createCategory);
    }
    const search = document.querySelector('.search');
    search.addEventListener('keyup', createSearched);
    categoryButtons[0].click();
  });
}

function loadAboutPage() {
  let nav = $('.navigation');
  nav.removeClass('navHome');
  document.querySelector('.title').innerHTML = 'Home / About';
  $('.main').empty();
  $('.main').load('../markup/about.html');
}
export { loadHomePage, loadProductsPage, loadAboutPage };
