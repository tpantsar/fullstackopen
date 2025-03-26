import express, { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { NewEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSentitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log('req.body:', req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    console.log('addedEntry:', addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.use(errorMiddleware);

export default router;
