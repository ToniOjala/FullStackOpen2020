import patientData from '../../data/patients.json';
import { Patient, PrivatePatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAll = ():Array<PrivatePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

export default {
  getAll
};