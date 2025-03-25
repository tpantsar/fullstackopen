import cors from "cors";
import express, { Request, Response } from "express";

import diagnoseRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use("/api/diagnoses", diagnoseRouter);

app.get("/api/ping", (_req: Request, res: Response) => {
  console.log("ping received");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
