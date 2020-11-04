import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAll());
});

router.get('/:id', (request, response) => {
  const patient = patientService.getById(request.params.id);
  if (patient) response.send(patient);
  response.status(404);
});

router.post('/', (request, response) => {
  const newPatient = toNewPatient(request.body);
  const createdPatient = patientService.create(newPatient);
  response.json(createdPatient);
});

router.post('/:id/entries', (request, response) => {
  const patient = patientService.getById(request.params.id);

  if (patient) {
    const newEntry = toNewEntry(request.body);
    const updatedPatient = patientService.addEntry(patient, newEntry);
    response.json(updatedPatient);
  }

  response.status(404);
});

export default router;