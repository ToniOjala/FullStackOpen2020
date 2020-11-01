import patientData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAll = ():Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

const getById = (id:string):Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) patient.entries = [];
  return patient;
};

const create = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
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