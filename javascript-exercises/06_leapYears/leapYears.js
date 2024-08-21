const leapYears = function (year) {
  const isCentury = year % 100 === 0;
  const isDivisibleByFour = year % 4 === 0;
  const isDivisibleByFourHundred = year % 400 === 0;

  return isCentury
    ? isDivisibleByFour && isDivisibleByFourHundred
    : isDivisibleByFour;
};

// Do not edit below this line
module.exports = leapYears;
