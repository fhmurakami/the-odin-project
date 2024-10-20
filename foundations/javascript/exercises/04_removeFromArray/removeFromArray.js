const removeFromArray = function (array, ...valuesToRemove) {
  return array.filter((element) => !valuesToRemove.includes(element));
};

// Do not edit below this line
module.exports = removeFromArray;
