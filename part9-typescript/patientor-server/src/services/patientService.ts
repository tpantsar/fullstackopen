import patientData from "../data/patients";
import { PatientEntry, SensitivePatientEntry } from "../types";

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
  return patients;
};

// https://fullstackopen.com/en/part9/typing_an_express_app#utility-types
// Omit the SSN field from the patient data
const getSentitiveEntries = (): SensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getSentitiveEntries,
  addPatient,
};
