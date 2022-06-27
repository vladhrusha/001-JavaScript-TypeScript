import food from '../data/food-items.json' assert { type: 'json' };
const numberOfMenuColumns = 2;

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
  console.log(numberOfMenuColumns);
  initializeMenuColumns(menu, numberOfMenuColumns);

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealType;

  for (let i = 0; i < mealTypes.length; i++) {
    if (mealTypes[i] == category.toLowerCase()) {
      mealTypeString = mealTypes[i];
    }
  }
  mealType = returnMealTypeObject(mealTypeString);

  fillMenuColumns(menu, mealType);
}

//create Menu with all food available
function createAllFoodCategoriesMenu() {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';
  initializeMenuColumns(menu, numberOfMenuColumns);

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealType;

  for (let i = 0; i < mealTypes.length - 1; i++) {
    mealTypeString = mealTypes[i];
    mealType = returnMealTypeObject(mealTypeString);
    fillMenuColumns(menu, mealType);
  }
}

//creates empty N menu columns in section with class menu
function initializeMenuColumns(menu, numberOfColumns) {
  for (let i = 0; i < numberOfColumns; i++) {
    menu.innerHTML += '<div class="menu__column">';
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

//fills menu columns with menu items
function fillMenuColumns(menu, mealType) {
  let menuColumns = menu.querySelectorAll('.menu__column');
  for (let j = 0; j < menuColumns.length; j++) {
    for (let i = j; i < mealType.length; i += menuColumns.length) {
      menuColumns[j].innerHTML += createMenuItem(mealType[i]);
    }
  }
}

//creates individual menu item
function createMenuItem(meal) {
  let menuItem = '';
  menuItem += '<article class="menu__items">';
  menuItem += `<img class="item__image" src="${meal.imageURL}">`;
  menuItem += '<div class="item__description">';
  menuItem += '<header class="item__header">';
  menuItem += `<h5>${meal.name}</h5>`;
  menuItem += `<h5 class="item__price">${meal.price}</h5>`;
  menuItem += '</header>';
  menuItem += '<p class="item__paragraph">';
  menuItem += `${meal.description}`;
  menuItem += '</p>';
  menuItem += '</div>';
  menuItem += '</article>';
  return menuItem;
}
