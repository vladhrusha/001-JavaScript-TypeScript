function isEmptyOrWhitespaceOnly(str) {
  return str == '' || str.trim().length === 0;
}

function compareName(a, b) {
  const name1 = a.name.common.toUpperCase();
  const name2 = b.name.common.toUpperCase();

  let comparison = 0;

  if (name1 > name2) {
    comparison = 1;
  } else if (name1 < name2) {
    comparison = -1;
  }
  return comparison;
}
export { isEmptyOrWhitespaceOnly, compareName };
