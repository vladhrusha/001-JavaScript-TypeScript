import {
  createAllCategories,
  createCategory,
  createFeatured,
  createSearched,
} from '../scripts/specificCatalogCreation.js';

import {
  getCart,
  initializeClearCart,
  onClickCart,
  getAddedItem,
} from '../scripts/cart.js';

initializeClearCart();
loadNavigation();
loadHomePage();

function loadNavigation() {
  $('.navigation').load('../markup/nav.html', function () {
    const nav = document.querySelector('.nav');
    nav.querySelector('.home').addEventListener('click', loadHomePage);
    nav.querySelector('.products').addEventListener('click', loadProductsPage);
    nav.querySelector('.about').addEventListener('click', loadAboutPage);
    const cart = document.querySelector('.cart');
    cart.addEventListener('click', onClickCart);
  });
}
function kek() {
  console.log('clicked');
}

function loadHomePage() {
  let nav = $('.navigation');
  nav.addClass('navHome');
  $('.main').empty();
  $('.main').load('../markup/home.html', function () {
    createFeatured();
    // let cartButtons = document.querySelectorAll('.main .cartAdd');

    // cartButtons.forEach((button) => {
    //   console.log(button);
    //   button.addEventListener('click', kek);
    // });

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
  $('.main').empty();
  $('.main').load('../markup/about.html');
}
