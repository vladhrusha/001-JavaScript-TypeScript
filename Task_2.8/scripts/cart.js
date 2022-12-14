import { addCartItemsEventListeners, getCartTotalPrice } from './cartUtils.js';

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
function onCheckout() {
  initializeClearCart();
  getCart();
  document.querySelector('.cart').innerHTML = '0';
}

function getAddedItem(e) {
  let item = e.currentTarget.parentElement.parentElement;
  let itemName = item.querySelector('.item__name').innerHTML;

  let cartNumberOfUniqueItems = parseInt(
    localStorage.getItem('cartNumberOfUniqueItems')
  );
  let cartTotalAmount = parseInt(localStorage.getItem('cartTotalAmount'));

  let cartItemsNames = JSON.parse(localStorage.getItem('cartItemsNames'));
  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));
  if (cartItemsNames.length == 0) {
    itemsAmountArray.push(1);
  }
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i] == itemName) {
      itemsAmountArray[i] += 1;
      break;
    }
  }
  let itemFound = false;

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i] == itemName) {
      itemFound = true;
    }
  }

  if (itemFound == false) {
    if (cartItemsNames.length != 0) {
      itemsAmountArray.push(1);
    }
    cartItemsNames[cartNumberOfUniqueItems] =
      item.querySelector('.item__name').innerHTML;
    localStorage.setItem(
      'cartNumberOfUniqueItems',
      cartNumberOfUniqueItems + 1
    );
  }

  localStorage.setItem('cartItemsNames', JSON.stringify(cartItemsNames));
  localStorage.setItem('itemsAmountArray', JSON.stringify(itemsAmountArray));
  cartTotalAmount++;
  localStorage.setItem('cartTotalAmount', cartTotalAmount);
  document.querySelector('.cart').innerHTML = cartTotalAmount;
  getCart();
}

function getCart() {
  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));
  let cartItemsNames = JSON.parse(localStorage.getItem('cartItemsNames'));
  let allItemsArray = JSON.parse(localStorage.getItem('allItemsArray'));

  let cart = document.querySelector('.cartDiv');
  let itemList = cart.querySelector('.cart__itemList');
  itemList.innerHTML = '';

  for (let i = 0; i < cartItemsNames.length; i++) {
    for (let j = 0; j < allItemsArray.length; j++) {
      if (cartItemsNames[i] == allItemsArray[j].name) {
        itemList.innerHTML += createCartItem(
          allItemsArray[j],
          itemsAmountArray[i]
        );
      }
    }
  }
  addCartItemsEventListeners(cart);
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
  cart.querySelector('.checkoutButton').addEventListener('click', onCheckout);
}

function initializeClearCart() {
  let array = [];
  localStorage.setItem('cartNumberOfUniqueItems', 0);
  localStorage.setItem('itemsAmountArray', JSON.stringify(array));
  localStorage.setItem('cartItemsNames', JSON.stringify(array));
  localStorage.setItem('cartTotalAmount', 0);
}

function createCartItem(item, amount) {
  return `
    	<article class="cart__item">
    	<img class="cart__image" src="${item.imageURL}">
    	<div class="item__info">
    	<h4 class="item__name">${item.name}</h4>
    	<span class="item__price">${item.price}</span>
    	<button class="item__remove">remove</button>
    	</div>
    	<div class="item__counter">
    	<span class="up">^</span>
    	<span class="item__amount">${amount}</span>
    	<span class="down">^</span>
      </article>
    	</div>
        `;
}

export { getAddedItem, getCart, initializeClearCart, onClickCart };
