const express = require("express");
const bodyParser = require("body-parser");

const PatientRepository = require("./PatientRepository");

const patientRepository = new PatientRepository();
patientRepository.populateStorage();

const app = express();

app.use(bodyParser.json());

let selectedPatient = null;

app.get("/patient", (req, res) => {
  if (selectedPatient === null) {
    res.statusCode(404);
    res.send();
  }

  const found = patientRepository.findOne(selectedPatient);

  if (!found) {
    res.statusCode(404);
    res.send();
  }

  res.send(found);
});

app.post("/patient", (req, res) => {
  const existsing = patientRepository.byId(req.body.id);

  if (!existsing) {
    res.statusCode(404);
    res.send();
  }

  selectedPatient = req.body.id

  return existsing
});

app.get("/search", (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    limit,
    offset,
    phone,
    birthDate
  } = req.query;


  const found = patientRepository.find({
    lastName,
    firstName,
    middleName,
    limit,
    offset,
    phone,
    birthDate
  });

  res.send(found);
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
