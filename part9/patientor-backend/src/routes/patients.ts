import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAll());
});

router.post('/', (request, response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = request.body;
  const createdPatient = patientService.create({ name, dateOfBirth, ssn, gender, occupation });
  response.json(createdPatient);
});

export default router;