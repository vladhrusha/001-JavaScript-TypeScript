import food from '../data/food-items.json' assert { type: 'json' };

addNavButtonsEvent();

function changeCategory() {
  let category = this.innerHTML;
  createMenuColumns(category);
}

function createMenuColumns(category) {
  let menu = document.querySelector('.menu');
  menu.innerHTML = '';

  let mealTypes = Object.keys(food);
  let mealTypeString;
  let mealTypeAssigned = true;
  let mealType;

  let menuColumn;

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
      mealTypeAssigned = false;
  }

  console.log(mealTypeAssigned);

  if (mealTypeAssigned == true) {
    menuColumn = '';
    menuColumn += '\t  <div class="menu__column">\n';
    for (let i = 0; i < mealType.length; i += 2) {
      menuColumn += createMenuItem(mealType[i]);
    }
    menuColumn += '\t\t  </div>\n';

    menu.innerHTML += menuColumn;

    menuColumn = '';
    menuColumn += '\t  <div class="menu__column">\n';
    for (let i = 1; i < mealType.length; i += 2) {
      menuColumn += createMenuItem(mealType[i]);
    }
    menuColumn += '\t\t  </div>\n';

    menu.innerHTML += menuColumn;
  }
}

function createMenuItem(mealType) {
  let menuItem = '';
  menuItem += '\t\t<article class="menu__items">\n';
  menuItem += `<img class="item__image" src="${mealType.imageURL}">\n`;
  menuItem += '\t\t  <div class="item__description">\n';
  menuItem += '\t\t\t<header class="item__header">\n';
  menuItem += `\t\t\t  <h5>${mealType.name}</h5>\n`;
  menuItem += `\t\t\t  <h5 class="item__price">${mealType.price}</h5>\n`;
  menuItem += '\t\t\t</header>\n';
  menuItem += '\t\t\t<p class="item__paragraph">\n';
  menuItem += `\t\t\t  ${mealType.description}\n`;
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
