import { z } from 'zod';
import { Gender } from './types';

export const NewEntrySchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date().nonempty(),
  ssn: z.string().length(11),
  gender: z.nativeEnum(Gender),
  occupation: z.string().nonempty(),
});
