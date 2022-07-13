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

  let cartUniqueItems = parseInt(localStorage['cartUniqueItems']);
  let cartTotalAmount = parseInt(localStorage['cartTotalAmount']);

  let cartItemsNames = JSON.parse(localStorage['cartItemsNames']);
  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);
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
    cartItemsNames[cartUniqueItems] =
      item.querySelector('.item__name').innerHTML;
    localStorage['cartUniqueItems'] = cartUniqueItems + 1;
  }

  localStorage['cartItemsNames'] = JSON.stringify(cartItemsNames);
  localStorage['itemsAmountArray'] = JSON.stringify(itemsAmountArray);
  cartTotalAmount++;
  localStorage['cartTotalAmount'] = cartTotalAmount;
  document.querySelector('.cart').innerHTML = cartTotalAmount;
}

function getCart() {
  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);
  let cartItemsNames = JSON.parse(localStorage['cartItemsNames']);
  let allItemsArray = JSON.parse(localStorage['allItemsArray']);

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
  localStorage['cartUniqueItems'] = 0;
  localStorage['itemsAmountArray'] = JSON.stringify(array);
  localStorage['cartItemsNames'] = JSON.stringify(array);
  localStorage['cartTotalAmount'] = 0;
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
