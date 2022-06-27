import food from '../data/food-items.json' assert { type: 'json' };

addNavButtonsEvent();
createAllFoodTypesMenu();

function addNavButtonsEvent() {
  let navButtons = document.querySelectorAll('.nav__buttons');
  navButtons[0].addEventListener('click', createAllFoodTypesMenu, false);
  for (let i = 1; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', changeCategory, false);
  }
}

function changeCategory() {
  let category = this.innerHTML;
  createMenu(category);
}

function createMenu(category) {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';
  menu.innerHTML += '\t  <div class="menu__column">\n';
  menu.innerHTML += '\t  <div class="menu__column">\n';

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealType;

  for (let i = 0; i < mealTypes.length; i++) {
    if (mealTypes[i] == category.toLowerCase()) {
      mealTypeString = mealTypes[i];
    }
  }
  mealType = returnMealTypeObject(mealTypeString);

  createMenuColumns(menu, mealType);
}

function createAllFoodTypesMenu() {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';
  menu.innerHTML += '\t  <div class="menu__column">\n';
  menu.innerHTML += '\t  <div class="menu__column">\n';

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealType;

  for (let i = 0; i < mealTypes.length - 1; i++) {
    mealTypeString = mealTypes[i];
    mealType = returnMealTypeObject(mealTypeString);
    createMenuColumns(menu, mealType);
  }
}

function returnMealTypeObject(mealTypeString) {
  let mealType;
  switch (mealTypeString) {
    case 'breakfast':
      mealType = food.breakfast;
      break;
    case 'dinner':
      mealType = food.dinner;
      break;
    case 'lunch':
      mealType = food.lunch;
      break;
    case 'shakes':
      mealType = food.shakes;
      break;
  }
  return mealType;
}

function createMenuColumns(menu, mealType) {
  for (let i = 0; i < mealType.length; i += 2) {
    menu.querySelectorAll('.menu__column')[0].innerHTML += createMenuItem(
      mealType[i]
    );
  }

  for (let i = 1; i < mealType.length; i += 2) {
    menu.querySelectorAll('.menu__column')[1].innerHTML += createMenuItem(
      mealType[i]
    );
  }
}

function createMenuItem(meal) {
  let menuItem = '';
  menuItem += '\t\t<article class="menu__items">\n';
  menuItem += `<img class="item__image" src="${meal.imageURL}">\n`;
  menuItem += '\t\t  <div class="item__description">\n';
  menuItem += '\t\t\t<header class="item__header">\n';
  menuItem += `\t\t\t  <h5>${meal.name}</h5>\n`;
  menuItem += `\t\t\t  <h5 class="item__price">${meal.price}</h5>\n`;
  menuItem += '\t\t\t</header>\n';
  menuItem += '\t\t\t<p class="item__paragraph">\n';
  menuItem += `\t\t\t  ${meal.description}\n`;
  menuItem +=
    '\t\t\t  quis ligula at mauris tempus auctor. Ut fermentum lacus et.\n';
  menuItem += '\t\t\t</p>\n';
  menuItem += '\t\t  </div>\n';
  menuItem += '\t\t</article>\n';
  return menuItem;
}
