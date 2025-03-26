import { z } from 'zod';
import { Gender, NewPatientEntry } from './types';

export const newEntrySchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date().nonempty(),
  ssn: z.string().length(11),
  gender: z.nativeEnum(Gender),
  occupation: z.string().nonempty(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export default toNewPatientEntry;
