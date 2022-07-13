import furniture from '../data/products.json' assert { type: 'json' };

function getAllItems() {
  const categoryTypes = Object.keys(furniture);
  let categoryTypeString;
  let categoryType;
  let allTypesArray = [];
  let allItemsArray = [];
  for (let i = 0; i < categoryTypes.length - 1; i++) {
    categoryTypeString = categoryTypes[i];
    categoryType = furniture[categoryTypeString];
    allTypesArray.push(furniture[categoryTypeString]);
  }

  allTypesArray.forEach((subarray) => {
    subarray.forEach((item) => {
      allItemsArray.push(item);
    });
  });
  return allItemsArray;
}

function sliderHandler(catalogItems) {
  let outputValue = parseFloat(
    document.querySelector('.slider__output').innerHTML
  );
  outputValue = Math.round(outputValue);

  if (!isNaN(outputValue)) {
    let finalArray = [];
    catalogItems.forEach((item) => {
      let itemPrice = parseInt(item.price.slice(1, item.price.length));
      if (itemPrice < outputValue) {
        finalArray.push(item);
      }
    });
    return finalArray;
  } else {
    return catalogItems;
  }
}
export { getAllItems, sliderHandler };
