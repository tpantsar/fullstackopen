import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateStatistics } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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
  } catch (e: unknown) {
    res.status(500).json({ error: "Internal server error", msg: e });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  console.log("daily_exercises:", daily_exercises);
  console.log("target:", target);

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const dailyExercises =
    Array.isArray(daily_exercises) &&
    daily_exercises.every((e) => typeof e === "number")
      ? daily_exercises
      : null;

  if (!dailyExercises) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  if (dailyExercises) {
    const result = calculateStatistics(dailyExercises, Number(target));
    res.json(result);
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
