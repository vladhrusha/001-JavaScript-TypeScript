import bubbleSort from './sorting/bubbleSort.js';
import selectionSort from './sorting/selectionSort.js';
import insertionSort from './sorting/insertionSort.js';
import quickSort from './sorting/quickSort.js';
import mergeSort from './sorting/mergeSort.js';

//
doSorting(100);
doSorting(1000);
doSorting(10000);
doSorting(100000);

function doSorting(n) {
  let array = generateArray(n, 100);
  let paragraph = document.querySelector('p');
  paragraph.innerHTML += '<br><br>';
  start();
  bubbleSort.bubbleSort([...array]);
  paragraph.innerHTML += `<br>Bubble Sort(N=${n}): ` + end() + 'ms<br><br>';

  start();
  selectionSort.selectionSort([...array]);
  paragraph.innerHTML += `<br>Selection Sort(N=${n}): ` + end() + 'ms<br><br>';

  start();
  insertionSort.insertionSort([...array]);
  paragraph.innerHTML += `<br>Insertion Sort(N=${n}): ` + end() + 'ms<br><br>';

  start();
  quickSort.quickSort([...array], 0, [...array].length - 1);
  paragraph.innerHTML += `<br>Quick Sort(N=${n}): ` + end() + 'ms<br><br>';

  start();
  mergeSort.mergeSort([...array]);
  paragraph.innerHTML += `<br>Merge Sort(N=${n}): ` + end() + 'ms<br>';
}

function generateArray(numberOfElements, maxValue) {
  let array = [];
  for (let i = 0; i < numberOfElements; i++) {
    array[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return array;
}
// function displayArray(array) {
//   array.forEach(
//     (element) => (document.querySelector('p').innerHTML += element + ' ')
//   );
// }

var startTime, endTime;

function start() {
  startTime = new Date();
}

function end() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  return timeDiff;
}
