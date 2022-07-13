function getAddedItem(e) {
  let item = e.currentTarget.parentElement.parentElement;
  let itemName = item.querySelector('.item__name').innerHTML;
  let counter = parseInt(localStorage['counter']);
  let data = JSON.parse(localStorage['cartItems']);
  let amountArray = JSON.parse(localStorage['amountArray']);
  if (data.length == 0) {
    amountArray.push(1);
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i] == itemName) {
      amountArray[i] += 1;
      break;
    }
  }
  let itemFound = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i] == itemName) {
      itemFound = true;
    }
  }

  if (itemFound == false) {
    if (data.length != 0) {
      amountArray.push(1);
    }
    data[counter] = item.querySelector('.item__name').innerHTML;
    localStorage['counter'] = counter + 1;
  }

  localStorage['cartItems'] = JSON.stringify(data);
  localStorage['amountArray'] = JSON.stringify(amountArray);

  document.querySelector('.cart').innerHTML = localStorage['counter'];
}

function getCart() {
  let amountArray = JSON.parse(localStorage['amountArray']);

  let itemList = document.querySelector('.cart__itemList');
  itemList.innerHTML = '';
  let data = JSON.parse(localStorage['cartItems']);
  let allItemsArray = JSON.parse(localStorage['allItemsArray']);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < allItemsArray.length; j++) {
      if (data[i] == allItemsArray[j].name) {
        itemList.innerHTML += createCartItem(allItemsArray[j], amountArray[i]);
      }
    }
  }
  let items = document.querySelectorAll('.cart__item');

  for (let i = 0; i < items.length; i++) {
    items[i]
      .querySelector('.item__remove')
      .addEventListener('click', removeCartItem);
    items[i]
      .querySelector('.up')
      .addEventListener('click', increaseCartItemAmount);
    items[i]
      .querySelector('.down')
      .addEventListener('click', decreaseCartItemAmount);
  }
  document.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
  document
    .querySelector('.checkoutButton')
    .addEventListener('click', onCheckout);
}

function increaseCartItemAmount(e) {
  let amountArray = JSON.parse(localStorage['amountArray']);

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  let amount = item.querySelector('.item__amount');
  let counter = parseInt(localStorage['counter']);

  amount.innerHTML = parseInt(amount.innerHTML) + 1;
  counter += 1;
  localStorage['counter'] = counter;
  document.querySelector('.cart').innerHTML = localStorage['counter'];
  amountArray[index] += 1;
  localStorage['amountArray'] = JSON.stringify(amountArray);
}

function decreaseCartItemAmount(e) {
  let amountArray = JSON.parse(localStorage['amountArray']);

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  amountArray[index] -= 1;
  if (amountArray[index] < 1) {
    amountArray.splice(index, 1);
  }

  let amount = item.querySelector('.item__amount');
  let data = JSON.parse(localStorage['cartItems']);
  let counter = parseInt(localStorage['counter']);
  counter = counter - 1;
  if (amount.innerHTML - 1 < 1) {
    for (let i = 0; i < data.length; i++) {
      if (item.querySelector('.item__name').innerHTML == data[i]) {
        data.splice(i, 1);
        localStorage['cartItems'] = JSON.stringify(data);
      }
    }
    item.remove();
  }
  localStorage['counter'] = counter;
  document.querySelector('.cart').innerHTML = localStorage['counter'];
  localStorage['amountArray'] = JSON.stringify(amountArray);

  amount.innerHTML = amount.innerHTML - 1;
}

function removeCartItem(e) {
  let amountArray = JSON.parse(localStorage['amountArray']);

  let counter = parseInt(localStorage['counter']);
  let item = e.currentTarget.parentElement.parentElement;
  let data = JSON.parse(localStorage['cartItems']);

  for (let i = 0; i < data.length; i++) {
    if (item.querySelector('.item__name').innerHTML == data[i]) {
      data.splice(i, 1);
      amountArray.splice(i, 1);

      localStorage['cartItems'] = JSON.stringify(data);
    }
  }
  counter -= item.querySelector('.item__amount').innerHTML;

  localStorage['counter'] = counter;
  localStorage['amountArray'] = JSON.stringify(amountArray);

  document.querySelector('.cart').innerHTML = localStorage['counter'];
  e.currentTarget.parentElement.parentElement.remove();
}

function getCartTotalPrice() {
  let amountArray = JSON.parse(localStorage['amountArray']);
  let data = JSON.parse(localStorage['cartItems']);
  let itemList = document.querySelectorAll('.cart__item');

  let totalPrice = 0;
  let itemPrice = 0;
  amountArray.forEach((itemAmount, index) => {
    let itemName = itemList[index].querySelector('.item__name').innerHTML;

    if (data[index] == itemName) {
      itemPrice = itemList[index].querySelector('.item__price').innerHTML;
      itemPrice = itemPrice.slice(1, itemPrice.length);
      itemPrice = parseFloat(itemPrice);
      console.log(itemPrice);
    }
    console.log(itemAmount);
    totalPrice += itemPrice * itemAmount;
  });
  console.log(totalPrice);
  return totalPrice;
}
function onCheckout() {
  initializeClearCart();
  getCart();
}

function initializeClearCart() {
  let array = [];
  localStorage['counter'] = 0;
  localStorage['amountArray'] = JSON.stringify(array);
  localStorage['cartItems'] = JSON.stringify(array);
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
export { getAddedItem, getCart, initializeClearCart };
