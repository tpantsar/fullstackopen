import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date().nonempty(),
  ssn: z.string().length(11),
  gender: z.nativeEnum(Gender),
  occupation: z.string().nonempty(),
});

export const PatientBaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().nonempty(),
  date: z.string().date().nonempty(),
  specialist: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = PatientBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntrySchema = PatientBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = PatientBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const NewEntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
