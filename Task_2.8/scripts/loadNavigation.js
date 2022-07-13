import { onClickCart } from '../scripts/cart.js';

import {
  loadHomePage,
  loadProductsPage,
  loadAboutPage,
} from '../scripts/loadPages.js';

function loadNavigation() {
  $('.navigation').load('../markup/nav.html', function () {
    const nav = document.querySelector('.nav');
    nav.querySelector('.home').addEventListener('click', loadHomePage);
    nav.querySelector('.products').addEventListener('click', loadProductsPage);
    nav.querySelector('.about').addEventListener('click', loadAboutPage);
    const cart = document.querySelector('.cart');
    cart.addEventListener('click', onClickCart);
    nav.querySelector('.showNow').addEventListener('click', loadProductsPage);
  });
}

export { loadNavigation };
