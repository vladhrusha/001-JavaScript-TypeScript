function addCartItemsEventListeners(cart) {
  let items = cart.querySelectorAll('.cart__item');

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
  let cart = document.querySelector('.cartDiv');

  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);
  let cartTotalAmount = parseInt(localStorage['cartTotalAmount']);

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  let amount = item.querySelector('.item__amount');
  let cartUniqueItems = parseInt(localStorage['cartUniqueItems']);

  amount.innerHTML = parseInt(amount.innerHTML) + 1;
  cartUniqueItems += 1;
  localStorage['cartUniqueItems'] = cartUniqueItems;
  itemsAmountArray[index] += 1;
  localStorage['itemsAmountArray'] = JSON.stringify(itemsAmountArray);

  cartTotalAmount++;
  localStorage['cartTotalAmount'] = cartTotalAmount;
  document.querySelector('.cart').innerHTML = cartTotalAmount;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function decreaseCartItemAmount(e) {
  let cart = document.querySelector('.cartDiv');

  let cartTotalAmount = parseInt(localStorage['cartTotalAmount']);

  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  itemsAmountArray[index] -= 1;
  if (itemsAmountArray[index] < 1) {
    itemsAmountArray.splice(index, 1);
  }

  let amount = item.querySelector('.item__amount');
  let cartItemsNames = JSON.parse(localStorage['cartItemsNames']);
  let cartUniqueItems = parseInt(localStorage['cartUniqueItems']);
  cartUniqueItems = cartUniqueItems - 1;
  if (amount.innerHTML - 1 < 1) {
    for (let i = 0; i < cartItemsNames.length; i++) {
      if (item.querySelector('.item__name').innerHTML == cartItemsNames[i]) {
        cartItemsNames.splice(i, 1);
        localStorage['cartItemsNames'] = JSON.stringify(cartItemsNames);
      }
    }
    item.remove();
  }
  cartTotalAmount--;
  localStorage['cartTotalAmount'] = cartTotalAmount;
  document.querySelector('.cart').innerHTML = cartTotalAmount;
  localStorage['cartUniqueItems'] = cartUniqueItems;
  localStorage['itemsAmountArray'] = JSON.stringify(itemsAmountArray);

  amount.innerHTML = amount.innerHTML - 1;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function removeCartItem(e) {
  let cart = document.querySelector('.cartDiv');

  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);
  let cartTotalAmount = parseInt(localStorage['cartTotalAmount']);

  let cartUniqueItems = parseInt(localStorage['cartUniqueItems']);
  let item = e.currentTarget.parentElement.parentElement;
  let cartItemsNames = JSON.parse(localStorage['cartItemsNames']);

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (item.querySelector('.item__name').innerHTML == cartItemsNames[i]) {
      cartItemsNames.splice(i, 1);
      cartTotalAmount = cartTotalAmount - parseInt(itemsAmountArray[i]);
      itemsAmountArray.splice(i, 1);
      localStorage['cartItemsNames'] = JSON.stringify(cartItemsNames);
    }
  }
  cartUniqueItems -= item.querySelector('.item__amount').innerHTML;

  localStorage['cartUniqueItems'] = cartUniqueItems;
  localStorage['itemsAmountArray'] = JSON.stringify(itemsAmountArray);

  e.currentTarget.parentElement.parentElement.remove();

  localStorage['cartTotalAmount'] = cartTotalAmount;
  document.querySelector('.cart').innerHTML = cartTotalAmount;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function getCartTotalPrice() {
  let itemsAmountArray = JSON.parse(localStorage['itemsAmountArray']);
  let cartItemsNames = JSON.parse(localStorage['cartItemsNames']);
  let itemList = document.querySelectorAll('.cart__item');

  let totalPrice = 0;
  let itemPrice = 0;
  itemsAmountArray.forEach((itemAmount, index) => {
    let itemName = itemList[index].querySelector('.item__name').innerHTML;

    if (cartItemsNames[index] == itemName) {
      itemPrice = itemList[index].querySelector('.item__price').innerHTML;
      itemPrice = itemPrice.slice(1, itemPrice.length);
      itemPrice = parseFloat(itemPrice);
    }
    totalPrice += itemPrice * itemAmount;
  });
  return totalPrice.toFixed(2);
}
export { addCartItemsEventListeners, getCartTotalPrice };
