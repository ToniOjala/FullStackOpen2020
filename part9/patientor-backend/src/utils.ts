/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, NewEntry, EntryType, Discharge, HealthCheckRating, Diagnosis, SickLeave, NewBaseEntry } from './types';

export const toNewPatient = (object:any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newPatient;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const baseEntry: NewBaseEntry = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist)
  };

  if (object.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return baseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = toNewBaseEntry(object);

  switch(baseEntry.type) {
    case EntryType.Hospital:
      return {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: parseDischarge(object.discharge)
      };
    case EntryType.OccupationalHealthcare:
      let employerName;
      let sickLeave;
      if (object.employerName) employerName = parseEmployerName(object.employerName);
      if (object.sickLeave) sickLeave = parseSickLeave(object.sickLeave);

      return { ...baseEntry, type: EntryType.OccupationalHealthcare, employerName, sickLeave };
    case EntryType.HealthCheck:
      return {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
  }
};

const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type: ' + type);
  }
  return type;
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!codes || !isArrayOfStrings(codes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + codes);
  }
  return codes;
};

const isArrayOfStrings = (array: any): array is Array<string> => {
  let areStrings = true;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  array.forEach((item: any) => {
    if (typeof item !== 'string') areStrings = false;
  });

  return areStrings;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

const isDischarge = (discharge: any): discharge is Discharge => {
  if (!discharge.date || !isString(discharge.date)) return false;
  if (!discharge.criteria || !isString(discharge.criteria)) return false;
  return true;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name: ' + name);
  }
  return name;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (!sickLeave.startDate || !isString(sickLeave.startDate)) return false;
  if (!sickLeave.endDate || !isString(sickLeave.endDate)) return false;
  return true;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === null || rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};