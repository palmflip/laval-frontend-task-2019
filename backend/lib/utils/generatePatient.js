const faker = require("faker");
const _ = require("lodash");

const generateRandomPerson = require("./generateRandomPerson");

const ids = new Set();

const generateId = () => {
  const id = faker.random.number();

  return ids.has(id) ? generateId() : id;
};

module.exports = () => {
  const id = generateId();

  const { firstName, lastName, middleName, gender } = generateRandomPerson();

  return {
    id,
    firstName,
    middleName,
    lastName,
    gender,
    county: faker.address.county(),
    email: faker.internet.email(),
    birthDate: faker.date
      .past()
      .toISOString()
      .split("T")[0],
    phone: Number(
      _.sample(["921", "911", "988", "962", "901"]) +
        faker.phone
          .phoneNumber()
          .replace(/[^\d]*/g, "")
          .slice(0, 7)
    ),
    servicePlan: _.sample(["VIP", "REGULAR"]),
    code: faker.random.uuid().slice(0, 8),
    omsChecked: faker.random.boolean(),
    patientHasDebt: faker.random.boolean(),
    payerHasDebt: faker.random.boolean(),
    lastVisitDate: faker.date
      .past()
      .toISOString()
      .split("T")[0]
  };
};
