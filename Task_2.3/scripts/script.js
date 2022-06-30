import bubbleSort from './sorting/bubbleSort.js';
import selectionSort from './sorting/selectionSort.js';
import insertionSort from './sorting/insertionSort.js';
import quickSort from './sorting/quickSort.js';
import mergeSort from './sorting/mergeSort.js';

// window.settings = {
//   bubbleSort: 'bubbleSort',
// };

const array = generateArray(10000, 100);
const results = document.querySelector('.results');

results.innerHTML += executeSort(bubbleSort.bubbleSort, array);
results.innerHTML += executeSort(selectionSort.selectionSort, array);
results.innerHTML += executeSort(insertionSort.insertionSort, array);
results.innerHTML += executeSort(quickSort.quickSort, array);
results.innerHTML += executeSort(mergeSort.mergeSort, array);

function generateArray(numberOfElements, maxValue) {
  let array = [];
  for (let i = 0; i < numberOfElements; i++) {
    array[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return array;
}

function executeSort(sort, array) {
  const t0 = performance.now();
  if (sort.name != 'quickSort') {
    sort([...array]);
  } else {
    sort([...array], 0, [...array].length - 1);
  }
  const t1 = performance.now();
  return `
  <p>
    <span style="font-size: 24px;">${sort.name}ing</span> ${
    array.length
  } elements took ${t1 - t0} milliseconds.
  </p>
  `;
}

// function dummyName(sortingName, array) {
//   const t0 = performance.now();
//   var fn = window[settings.sortingName];
//   console.log(fn);
//   const t1 = performance.now();
//   console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
// }
