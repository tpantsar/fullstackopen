import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { SensitivePatientEntry } from '../types';

import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<SensitivePatientEntry[]>) => {
  res.send(patientService.getNonSentitiveEntries());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    console.log('addedEntry:', addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
