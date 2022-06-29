import food from '../data/food-items.json' assert { type: 'json' };
const numberOfMenuColumns = 2;

addNavButtonsEvent();
createAllFoodCategoriesMenu();

//adds changeMenu Event(onClick)
function addNavButtonsEvent() {
  const navButtons = document.querySelectorAll('.nav__buttons');
  navButtons[0].addEventListener('click', createAllFoodCategoriesMenu, false);
  navButtons.forEach((button, i) => {
    if (i != 0) {
      button.addEventListener('click', onChangeMenuCategory, false);
    }
  });
}

function onChangeMenuCategory() {
  const category = this.innerHTML;
  createCategoryMenu(category);
}

//creates menu with all food in provided category
function createCategoryMenu(category) {
  const menu = document.querySelector('.menu');
  menu.innerHTML = '';
  initializeMenuColumns(menu, numberOfMenuColumns);

  const mealTypes = Object.keys(food);
  let mealTypeString;

  mealTypeString = mealTypes.find((type) => type == category.toLowerCase());
  const mealType = food[mealTypeString];
  fillMenuColumns(menu, mealType);
}

//create Menu with all food available
function createAllFoodCategoriesMenu() {
  const menu = document.querySelector('.menu');
  menu.innerHTML = '';
  initializeMenuColumns(menu, numberOfMenuColumns);

  const mealTypes = Object.keys(food);
  let mealTypeString;
  let mealType;

  for (let i = 0; i < mealTypes.length - 1; i++) {
    mealTypeString = mealTypes[i];
    mealType = food[mealTypeString];
    fillMenuColumns(menu, mealType);
  }
}

//creates empty N menu columns in section with class menu
function initializeMenuColumns(menu, numberOfColumns) {
  for (let i = 0; i < numberOfColumns; i++) {
    menu.innerHTML += '<div class="menu__column">';
  }
}

//fills menu columns with menu items
function fillMenuColumns(menu, mealType) {
  const menuColumns = menu.querySelectorAll('.menu__column');
  for (let j = 0; j < menuColumns.length; j++) {
    for (let i = j; i < mealType.length; i += menuColumns.length) {
      menuColumns[j].innerHTML += createMenuItem(mealType[i]);
    }
  }
}

//creates individual menu item
function createMenuItem(meal) {
  return `
  <article class="menu__items">
    <img class="item__image" src="${meal.imageURL}">
    <div class="item__description">
      <header class="item__header">
        <h5>${meal.name}</h5>
        <h5 class="item__price">${meal.price}</h5>
      </header>
      <p class="item__paragraph">
        ${meal.description}
      </p>
    </div>
  </article>
  `;
}
