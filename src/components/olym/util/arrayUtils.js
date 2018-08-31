const pushToList = (item, value) => {
  if (item === undefined) {
    item = [];
  }
  item.push(value);
  return item;
}

const convertDuplicateToUnique = (array, key) => {
  let temp = {};
  array.forEach(item => {
    temp[item[key]] = pushToList(temp[item[key]], item);
    let length = temp[item[key]].length;
    if (length > 1) {
      item[key] = temp[item[key]][length - 2][key] + ' ';
    }
  })
  return array;
}

export default {
  pushToList,
  convertDuplicateToUnique,
}