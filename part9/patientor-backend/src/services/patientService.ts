import patientData from '../../data/patients.json';
import { Patient, PrivatePatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAll = ():Array<PrivatePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const create = (patient: NewPatient) => {
  const newPatient = {
    id: uuidv4(),
  ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  create
};