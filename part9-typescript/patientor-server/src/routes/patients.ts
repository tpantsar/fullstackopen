import express, { Response } from "express";
import patientService from "../services/patientService";
import { SensitivePatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<SensitivePatientEntry[]>) => {
  res.send(patientService.getSentitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
