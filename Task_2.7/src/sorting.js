function quickSort(array) {
  executeQuickSort(array, 0, array.length - 1);
}

function executeQuickSort(array, left, right) {
  let index;

  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      executeQuickSort(array, left, index - 1);
    }

    if (index < right) {
      executeQuickSort(array, index, right);
    }
  }
  return array;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)],
    i = left,
    j = right;

  while (i <= j) {
    while (array[i].name.common < pivot.name.common) {
      i++;
    }

    while (array[j].name.common > pivot.name.common) {
      j--;
    }

    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];

      i++;
      j--;
    }
  }
  return i;
}

export { quickSort };
