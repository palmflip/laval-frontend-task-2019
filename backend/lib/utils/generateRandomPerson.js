const _ = require("lodash");

const randomNames = {
  m: {
    firstNames: require("faker/lib/locales/ru/name/male_first_name"),
    middleNames: require("faker/lib/locales/ru/name/male_middle_name"),
    lastNames: require("faker/lib/locales/ru/name/male_last_name")
  },
  f: {
    firstNames: require("faker/lib/locales/ru/name/female_first_name"),
    middleNames: require("faker/lib/locales/ru/name/female_middle_name"),
    lastNames: require("faker/lib/locales/ru/name/female_last_name")
  }
};

module.exports = () => {
  const gender = Math.round(Math.random()) === 1 ? "m" : "f";

  return {
    firstName: _.sample(randomNames[gender].firstNames),
    middleName: _.sample(randomNames[gender].middleNames),
    lastName: _.sample(randomNames[gender].lastNames),
    gender
  };
};
