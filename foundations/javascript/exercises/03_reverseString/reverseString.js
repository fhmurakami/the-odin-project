const reverseString = function (string) {
  let reversedString = "";

  for (let index = string.length - 1; index >= 0; index--) {
    reversedString += string.at(index);
  }

  return reversedString;
};

// Do not edit below this line
module.exports = reverseString;
