import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

// remove sensitive data, like SSN and patient journal entries
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
