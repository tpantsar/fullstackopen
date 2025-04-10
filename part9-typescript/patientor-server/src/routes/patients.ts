import express, { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import {
  Entry,
  NewPatient,
  NewPatientEntry,
  NewPatientEntryParams,
  NonSensitivePatientEntry,
  PatientEntry,
} from '../types';
import { NewEntrySchema, NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSentitiveEntries());
});

router.get('/:id', (req: Request, res: Response<PatientEntry | { error: string }>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log('req.body:', req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<NewPatientEntryParams, unknown, NewPatientEntry>, res: Response<Entry>) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);
    const addedPatientEntry = patientService.addPatientEntry(req.params.id, req.body);
    res.json(addedPatientEntry);
  },
);

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
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
  (req: Request<unknown, unknown, NewPatient>, res: Response<PatientEntry>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
