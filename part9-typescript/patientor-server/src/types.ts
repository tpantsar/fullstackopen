import { z } from 'zod';
import { NewPatientSchema } from './utils';
import { ParamsDictionary } from 'express-serve-static-core';

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

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

// Common properties of all patient page entries
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
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

export interface NewPatientEntryParams extends ParamsDictionary {
  id: string;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// infer the type from schema
export type NewPatient = z.infer<typeof NewPatientSchema>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewPatientEntry = UnionOmit<Entry, 'id'>;

// remove sensitive data, like SSN and patient journal entries
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
