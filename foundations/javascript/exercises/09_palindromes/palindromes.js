const palindromes = function (string) {
  let reversed = string.split("").reverse().join("");

  if (
    string.localeCompare(reversed, undefined, {
      ignorePunctuation: true,
      sensitivity: "base",
    }) == 0
  ) {
    return true;
  }

  return false;
};

// Do not edit below this line
module.exports = palindromes;
