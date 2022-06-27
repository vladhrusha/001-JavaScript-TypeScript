import food from '../data/food-items.json' assert { type: 'json' };

addNavButtonsEvent();
createAllFoodTypes();
function changeCategory() {
  let category = this.innerHTML;
  createMenuColumns(category);
}

function createMenuColumns(category) {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';

  let mealTypes = Object.keys(food);
  console.log(mealTypes);
  let mealTypeString;
  let mealTypeAssigned = true;
  let mealType;

  let menuColumn;
  menu.innerHTML += '\t  <div class="menu__column">\n';

  for (let i = 0; i < mealTypes.length; i++) {
    if (mealTypes[i] == category.toLowerCase()) {
      mealTypeString = mealTypes[i];
    }
  }

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
    default:
      createAllFoodTypes();
      mealTypeAssigned = false;
  }

  if (mealTypeAssigned == true) {
    menuColumn = '';
    menuColumn += '\t  <div class="menu__column">\n';
    for (let i = 0; i < mealType.length; i += 2) {
      menu.querySelectorAll('.menu__column')[0].innerHTML += createMenuItem(
        mealType[i]
      );
    }
    menuColumn += '\t\t  </div>\n';

    menu.innerHTML += menuColumn;

    menuColumn = '';
    menuColumn += '\t  <div class="menu__column">\n';
    for (let i = 1; i < mealType.length; i += 2) {
      menu.querySelectorAll('.menu__column')[1].innerHTML += createMenuItem(
        mealType[i]
      );
    }
    menuColumn += '\t\t  </div>\n';

    menu.innerHTML += menuColumn;
  }
}

function createAllFoodTypes() {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealTypeAssigned = true;
  let mealType;

  menu.innerHTML += '\t  <div class="menu__column">\n';
  menu.innerHTML += '\t  <div class="menu__column">\n';
  for (let i = 0; i < mealTypes.length - 1; i++) {
    mealTypeString = mealTypes[i];

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
      default:
        mealTypeAssigned = false;
    }

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

function addNavButtonsEvent() {
  let navButtons = document.querySelectorAll('.nav__buttons');
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', changeCategory, false);
  }
}
