import { z } from 'zod';
import { NewEntrySchema } from './utils';

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
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

// remove sensitive data, like SSN
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
