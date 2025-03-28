import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface Entry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  type?: string;
  employerName?: string;
  healthCheckRating?: number;
  discharge?: Discharge;
  sickLeave?: SickLeave;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

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
