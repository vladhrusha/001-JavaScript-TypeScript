function selectionSort(countries) {
  let min;

  for (let i = 0; i < countries.length; i++) {
    min = i;

    for (let j = i + 1; j < countries.length; j++) {
      if (countries[j].name.common < countries[min].name.common) {
        min = j;
      }
    }

    if (min !== i) {
      [countries[i], countries[min]] = [countries[min], countries[i]];
    }
  }

  return countries;
}
export { selectionSort };
