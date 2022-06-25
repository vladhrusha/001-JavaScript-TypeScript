let navButtons = document.querySelectorAll('.nav__buttons');
let section = document.querySelector('.menu');
import food from '../data/food-items.json' assert { type: 'json' };

for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', changeCategory, false);
}

function changeCategory() {
  let keys = Object.keys(food);
  let category = this.innerHTML;
  let mealType = 0;

  // console.log(food);
  console.log(keys);

  console.log(food.shakes.length);

  section.innerHTML = '';
  createMenuColumn(keys, category, mealType);
}

function createMenuColumn(keys, category, mealType) {
  let menuColumn = '';

  menuColumn += '\t  <div class="menu__column">\n';
  if (keys[0] == category.toLowerCase()) {
    for (let i = 0; i < food.breakfast.length; i += 2) {
      menuColumn += createMenuItem(food.breakfast, i);
    }
  }
  menuColumn += '\t\t  </div>\n';

  section.innerHTML += menuColumn;

  menuColumn = '';
  menuColumn += '\t  <div class="menu__column">\n';
  if (keys[0] == category.toLowerCase()) {
    for (let i = 1; i < food.breakfast.length; i += 2) {
      menuColumn += createMenuItem(food.breakfast, i);
    }
  }
  menuColumn += '\t\t  </div>\n';

  section.innerHTML += menuColumn;
}

function createMenuItem(category, i) {
  console.log(category[0].imageURL);
  let menuItem = '';

  menuItem += '\t\t<article class="menu__items">\n';
  menuItem += `<img class="item__image" src="${category[i].imageURL}">\n`;
  menuItem += '\t\t  <div class="item__description">\n';
  menuItem += '\t\t\t<header class="item__header">\n';
  menuItem += `\t\t\t  <h5>${category[i].name}</h5>\n`;
  menuItem += `\t\t\t  <h5 class="item__price">${category[i].price}</h5>\n`;
  menuItem += '\t\t\t</header>\n';
  menuItem += '\t\t\t<p class="item__paragraph">\n';
  menuItem += `\t\t\t  ${category[i].description}\n`;
  menuItem +=
    '\t\t\t  quis ligula at mauris tempus auctor. Ut fermentum lacus et.\n';
  menuItem += '\t\t\t</p>\n';
  menuItem += '\t\t  </div>\n';
  menuItem += '\t\t</article>\n';
  return menuItem;
}
