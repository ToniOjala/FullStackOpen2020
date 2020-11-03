import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients = [...patientData];

const getAll = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const getById = (id:string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const create = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getById,
  create
};