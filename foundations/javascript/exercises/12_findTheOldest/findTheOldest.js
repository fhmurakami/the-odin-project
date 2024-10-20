const findTheOldest = function (listOfPeople) {
  let currentYear = new Date().getFullYear();

  const ages = listOfPeople.map((person) => {
    if (person.yearOfDeath == undefined) {
      return currentYear - person.yearOfBirth;
    } else {
      return person.yearOfDeath - person.yearOfBirth;
    }
  });

  const maxAge = ages.reduce((max, age) => Math.max(max, age));

  const oldest = listOfPeople[ages.indexOf(maxAge)];

  return oldest;
};

// Do not edit below this line
module.exports = findTheOldest;
