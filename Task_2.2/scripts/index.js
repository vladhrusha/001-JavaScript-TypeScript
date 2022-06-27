import food from '../data/food-items.json' assert { type: 'json' };

addNavButtonsEvent();
createAllFoodCategoriesMenu();

//adds changeMenu Event(onClick)
function addNavButtonsEvent() {
  let navButtons = document.querySelectorAll('.nav__buttons');
  navButtons[0].addEventListener('click', createAllFoodCategoriesMenu, false);
  for (let i = 1; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', changeMenuCategory, false);
  }
}

function changeMenuCategory() {
  let category = this.innerHTML;
  createCategoryMenu(category);
}

//creates menu with all food in provided category
function createCategoryMenu(category) {
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

//create Menu with all food available
function createAllFoodCategoriesMenu() {
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

//returns mealType Objects that contains all meals for select type
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

//creates menu columns with menu items
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

//creates individual menu item
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
  menuItem += '\t\t\t</p>\n';
  menuItem += '\t\t  </div>\n';
  menuItem += '\t\t</article>\n';
  return menuItem;
}
