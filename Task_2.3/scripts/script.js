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

results.innerHTML += selectSortingMethod('bubbleSort', array);
results.innerHTML += selectSortingMethod('selectionSort', array);
results.innerHTML += selectSortingMethod('insertionSort', array);
results.innerHTML += selectSortingMethod('quickSort', array);
results.innerHTML += selectSortingMethod('mergeSort', array);

function generateArray(numberOfElements, maxValue) {
  let array = [];
  for (let i = 0; i < numberOfElements; i++) {
    array[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return array;
}

function selectSortingMethod(fnString, array) {
  const t0 = performance.now();
  switch (fnString) {
    case 'bubbleSort':
      bubbleSort.bubbleSort([...array]);
      break;
    case 'selectionSort':
      selectionSort.selectionSort([...array]);
      break;
    case 'insertionSort':
      insertionSort.insertionSort([...array]);
      break;
    case 'quickSort':
      quickSort.quickSort([...array], 0, [...array].length - 1);
      break;
    case 'mergeSort':
      mergeSort.mergeSort([...array]);
      break;
  }
  const t1 = performance.now();

  return `
  <p>
    <span style="font-size: 24px;">${fnString}ing</span> ${
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
