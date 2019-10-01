const generateRandomPatient = require("./utils/generatePatient");

const createMatcher = input => {
  if (input === undefined) {
    return null;
  }

  return str => {
    const contains = new RegExp(String(input).toLowerCase(), 'i');

    return contains.test(String(str));
  };
};

const combineName = ({ lastName, firstName, middleName }) =>
  `${lastName}${firstName}${middleName}`;

module.exports = class PatientRepository {
  constructor() {
    this.storage = [];
    this.byId = new Map();
  }

  populateStorage() {
    for (let i = 0; i <= 500; i++) {
      const patient = generateRandomPatient();

      this.storage.push(patient);
      this.byId.set(patient.id, patient);
    }

    this.storage.sort((a, b) => `${combineName(a)}` < `${combineName(b)}`);
  }

  findOne(id) {
    return this.byId(id);
  }

  find(params = {}) {
    const found = [];

    const limit = params.limit || 20;
    const offset = params.offset || 0;

    const lastNameMatcher = createMatcher(params.lastName);
    const firstNameMatcher = createMatcher(params.firstName);
    const middleNameMatcher = createMatcher(params.middleName);
    const phoneMatcher = createMatcher(params.phone);

    for (let i = 0; i <= this.storage.length - 1; i++) {
      const patient = this.storage[i];

      if (lastNameMatcher && !lastNameMatcher(patient.lastName)) {
        continue;
      }

      if (firstNameMatcher && !firstNameMatcher(patient.firstName)) {
        continue;
      }

      if (middleNameMatcher && !middleNameMatcher(patient.middleName)) {
        continue;
      }

      if (phoneMatcher && !phoneMatcher(patient.phone)) {
        continue;
      }

      if (params.birthDate && params.birthDate !== patient.birthDate) {
        continue;
      }

      found.push(patient);
    }

    return {
      patients: found.slice(offset, offset + limit),
      totalCount: found.length
    };
  }
};
