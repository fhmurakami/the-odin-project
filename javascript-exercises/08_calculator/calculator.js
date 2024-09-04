const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((acc, number) => acc + number, 0);
};

const multiply = function (array) {
  return array.length == 0 ? 0 : array.reduce((acc, number) => acc * number);
};

const power = function (number, power) {
  return Math.pow(number, power);
};

const factorial = function (number) {
  if (number === 0) {
    return 1;
  } else {
    return number * factorial(number - 1);
  }
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
