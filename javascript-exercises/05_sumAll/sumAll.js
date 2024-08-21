const sumAll = function (...args) {
  if (args.some((item) => !Number.isInteger(item) || item < 0) == true) {
    return "ERROR";
  }

  let sum = 0;
  let startValue = Math.min(...args);
  let stopValue = Math.max(...args);

  for (let i = startValue; i <= stopValue; i++) {
    sum += i;
  }

  return sum;
};

// Do not edit below this line
module.exports = sumAll;
