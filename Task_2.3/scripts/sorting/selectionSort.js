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
export default { selectionSort };
