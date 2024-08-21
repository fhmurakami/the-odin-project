const repeatString = function (string, numberOfTimes) {
  let repeated_string = "";
  if (numberOfTimes < 0) {
    return "ERROR";
  } else {
    for (i = 0; i < numberOfTimes; i++) {
      repeated_string += string;
    }
  }

  return repeated_string;
};

// Do not edit below this line
module.exports = repeatString;
