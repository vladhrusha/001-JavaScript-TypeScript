function getAddedItem(e) {
  let item = e.currentTarget.parentElement.parentElement;
  let counter = parseInt(localStorage['counter']);
  let data = JSON.parse(localStorage['cartItems']);
  data[counter] = item.querySelector('.item__name').innerHTML;
  localStorage['cartItems'] = JSON.stringify(data);
  localStorage['counter'] = counter + 1;
  document.querySelector('.cart').innerHTML = localStorage['counter'];
  console.log(document.querySelector('.cart').innerHTML);
}
let amountArray = [];
function getCart() {
  console.log(amountArray[0]);
  let itemList = document.querySelector('.cart__itemList');
  itemList.innerHTML = '';
  let data = JSON.parse(localStorage['cartItems']);
  let allItemsArray = JSON.parse(localStorage['allItemsArray']);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < allItemsArray.length; j++) {
      if (data[i] == allItemsArray[j].name) {
        itemList.innerHTML += createCartItem(allItemsArray[j]);
        amountArray.push(1);
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
}

function increaseCartItemAmount(e) {
  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  let amount = item.querySelector('.item__amount');
  let counter = parseInt(localStorage['counter']);

  amount.innerHTML = parseInt(amount.innerHTML) + 1;
  counter += 1;
  localStorage['counter'] = counter;
  document.querySelector('.cart').innerHTML = localStorage['counter'];
  console.log(amountArray);
  amountArray[index] += 1;
}

function decreaseCartItemAmount(e) {
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

  amount.innerHTML = amount.innerHTML - 1;
}

function removeCartItem(e) {
  let counter = parseInt(localStorage['counter']);
  let item = e.currentTarget.parentElement.parentElement;
  let data = JSON.parse(localStorage['cartItems']);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    if (item.querySelector('.item__name').innerHTML == data[i]) {
      data.splice(i, 1);
      localStorage['cartItems'] = JSON.stringify(data);
    }
  }
  counter -= item.querySelector('.item__amount').innerHTML;

  localStorage['counter'] = counter;
  document.querySelector('.cart').innerHTML = localStorage['counter'];
  e.currentTarget.parentElement.parentElement.remove();
}

function createCartItem(item) {
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
    	<span class="item__amount">1</span>
    	<span class="down">^</span>
      </article>
    	</div>
        `;
}
export { getAddedItem, getCart };
