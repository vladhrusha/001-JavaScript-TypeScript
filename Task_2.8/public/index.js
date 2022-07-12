import {
  createAllCategories,
  createCategory,
  createFeatured,
} from '../scripts/specificCatalogCreation.js';

import { getCart } from '../scripts/createCart.js';

const array = [];
localStorage['cartItems'] = JSON.stringify(array);
localStorage['counter'] = 0;
loadNavigation();
// loadHome();

function loadNavigation() {
  $('.navigation').load('../markup/nav.html', function () {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
      button.addEventListener('click', onNavButtonClick);
    });

    const cart = document.querySelector('.cart');
    cart.addEventListener('click', onClickCart);
  });
}

function onNavButtonClick(e) {
  let buttonName = e.currentTarget.innerHTML;
  switch (buttonName) {
    case 'Home':
      $('.main').empty();
      // loadHome();
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
function loadHome() {
  $('.main').load('../markup/home.html', function () {
    createFeatured();
    document.querySelector(
      '.featured'
    ).innerHTML += `<button class="productLink">ALL PRODUCTS</button>`;
  });

  let nav = document.querySelector('.nav');

  console.log(nav);
  // nav.classList.toggle('navhome');

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
    getCart();
  });
}
