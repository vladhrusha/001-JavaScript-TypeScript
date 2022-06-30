function bubbleSort(array) {
  let isSwapped;
  for (let i = 0; i < array.length; i++) {
    isSwapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      return array;
    }
  }
  return array;
}

export { bubbleSort };
