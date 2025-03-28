import { v4 as uuid } from 'uuid';
import patientData from '../data/patients';
import { NewPatientEntry as NewPatient, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

// https://fullstackopen.com/en/part9/typing_an_express_app#utility-types
// Omit the SSN and patient entries field from the response
const getNonSentitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  };
};

const addPatient = (patient: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatientWithoutEntries = {
    id,
    entries: [],
    ...patient,
  };

  patients.push(newPatientWithoutEntries);
  return newPatientWithoutEntries;
};

export default {
  getEntries,
  getNonSentitiveEntries,
  getPatientById,
  addPatient,
};
