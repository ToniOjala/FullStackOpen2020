import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAll());
});

router.get('/:id', (request, response) => {
  const patient = patientService.getById(request.params.id);
  response.send(patient);
});

router.post('/', (request, response) => {
  const newPatient = toNewPatient(request.body);
  const createdPatient = patientService.create(newPatient);
  response.json(createdPatient);
});

export default router;