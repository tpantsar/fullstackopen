import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const { bmiValue, bmiCategory } = calculateBmi(height, weight);

    const response = {
      weight,
      height,
      bmi: bmiValue,
      category: bmiCategory,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
