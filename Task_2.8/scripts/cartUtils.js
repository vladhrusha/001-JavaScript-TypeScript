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

function writeToLocalStorage(
  cartTotalAmount,
  cartNumberOfUniqueItems,
  itemsAmountArray
) {
  localStorage.setItem('cartTotalAmount', cartTotalAmount);
  localStorage.setItem('cartNumberOfUniqueItems', cartNumberOfUniqueItems);
  localStorage.setItem('itemsAmountArray', JSON.stringify(itemsAmountArray));
}

function increaseCartItemAmount(e) {
  let cart = document.querySelector('.cartDiv');

  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));
  let cartTotalAmount = parseInt(localStorage.getItem('cartTotalAmount'));

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  let amount = item.querySelector('.item__amount');
  let cartNumberOfUniqueItems = parseInt(
    localStorage.getItem('cartNumberOfUniqueItems')
  );

  amount.innerHTML = parseInt(amount.innerHTML) + 1;
  cartNumberOfUniqueItems++;
  itemsAmountArray[index]++;
  cartTotalAmount++;

  writeToLocalStorage(
    cartTotalAmount,
    cartNumberOfUniqueItems,
    itemsAmountArray
  );

  document.querySelector('.cart').innerHTML = cartTotalAmount;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function decreaseCartItemAmount(e) {
  let cart = document.querySelector('.cartDiv');

  let cartTotalAmount = parseInt(localStorage.getItem('cartTotalAmount'));

  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));

  let item = e.currentTarget.parentElement.parentElement;
  let parent = item.parentElement;
  let index = Array.prototype.indexOf.call(parent.children, item);
  itemsAmountArray[index]--;
  if (itemsAmountArray[index] < 1) {
    itemsAmountArray.splice(index, 1);
  }

  let amount = item.querySelector('.item__amount');
  let cartItemsNames = JSON.parse(localStorage.getItem('cartItemsNames'));
  let cartNumberOfUniqueItems = parseInt(
    localStorage.getItem('cartNumberOfUniqueItems')
  );
  cartNumberOfUniqueItems = cartNumberOfUniqueItems - 1;
  if (parseInt(amount.innerHTML) - 1 < 1) {
    for (let i = 0; i < cartItemsNames.length; i++) {
      if (item.querySelector('.item__name').innerHTML == cartItemsNames[i]) {
        cartItemsNames.splice(i, 1);
        localStorage.setItem('cartItemsNames', JSON.stringify(cartItemsNames));
      }
    }
    item.remove();
  }
  cartTotalAmount--;
  writeToLocalStorage(
    cartTotalAmount,
    cartNumberOfUniqueItems,
    itemsAmountArray
  );
  document.querySelector('.cart').innerHTML = cartTotalAmount;

  amount.innerHTML = parseInt(amount.innerHTML) - 1;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function removeCartItem(e) {
  let cart = document.querySelector('.cartDiv');

  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));
  let cartTotalAmount = parseInt(localStorage.getItem('cartTotalAmount'));

  let cartNumberOfUniqueItems = parseInt(
    localStorage.getItem('cartNumberOfUniqueItems')
  );
  let item = e.currentTarget.parentElement.parentElement;
  let cartItemsNames = JSON.parse(localStorage.getItem('cartItemsNames'));

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (item.querySelector('.item__name').innerHTML == cartItemsNames[i]) {
      cartItemsNames.splice(i, 1);
      cartTotalAmount = cartTotalAmount - parseInt(itemsAmountArray[i]);
      itemsAmountArray.splice(i, 1);
      localStorage.setItem('cartItemsNames', JSON.stringify(cartItemsNames));
    }
  }
  console.log(cartNumberOfUniqueItems);
  cartNumberOfUniqueItems -= item.querySelector('.item__amount').innerHTML;
  console.log(cartNumberOfUniqueItems);

  writeToLocalStorage(
    cartTotalAmount,
    cartNumberOfUniqueItems,
    itemsAmountArray
  );

  e.currentTarget.parentElement.parentElement.remove();
  document.querySelector('.cart').innerHTML = cartTotalAmount;
  cart.querySelector('.totalPrice').innerHTML =
    'Total: $' + getCartTotalPrice();
}

function getCartTotalPrice() {
  let itemsAmountArray = JSON.parse(localStorage.getItem('itemsAmountArray'));
  let cartItemsNames = JSON.parse(localStorage.getItem('cartItemsNames'));
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
