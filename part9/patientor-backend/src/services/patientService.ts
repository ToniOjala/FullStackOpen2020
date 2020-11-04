import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

let patients = [...patientData];

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

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  patient.entries.push({ id: uuidv4(), ...newEntry });

  patients = patients.map(p => {
    if (p.id === patient.id) return patient;
    return p;
  });

  return patient;
};

export default {
  getAll,
  getById,
  create,
  addEntry
};