import { v4 as uuid } from 'uuid';
import patientData from '../data/patients';
import { NewPatientEntry, PatientEntry, SensitivePatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

// https://fullstackopen.com/en/part9/typing_an_express_app#utility-types
// Omit the SSN field from the patient data
const getNonSentitiveEntries = (): SensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSentitiveEntries,
  addPatient,
};
