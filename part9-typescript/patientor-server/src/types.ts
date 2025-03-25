export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type SensitivePatientEntry = Omit<PatientEntry, "ssn">;
