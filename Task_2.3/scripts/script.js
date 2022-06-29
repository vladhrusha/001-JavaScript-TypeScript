// Bubble Sort - Сортировка пузырьком
// Selection Sort - Сортировка выбором
// Insertion Sort - Сортировка вставками
// Quicksort - Быстрая сортировка
// Merge Sort - Сортировка слиянием

let array = generateArray(100, 100);
displayArray(array);
displayArray(bubbleSort(array));

array = generateArray(100, 100);
displayArray(array);
displayArray(selectionSort(array));

function generateArray(numberOfElements, maxValue) {
  let array = [];
  for (let i = 0; i < numberOfElements; i++) {
    array[i] = Math.floor(Math.random() * maxValue) + 1;
  }
  return array;
}
function displayArray(array) {
  array.forEach(
    (element) => (document.querySelector('p').innerHTML += element + ' ')
  );
  document.querySelector('p').innerHTML += '<br><br>';
}

function bubbleSort(array) {
  let isSwapped;
  for (let i = 0; i < array.length; i++) {
    isSwapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      return array;
    }
  }
  return array;
}

function selectionSort(array) {
  let min;

  for (let i = 0; i < array.length; i++) {
    min = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
    }
  }

  return array;
}

function insertionSort(array) {}

function quickSort(array) {}

function mergeSort(array) {}
