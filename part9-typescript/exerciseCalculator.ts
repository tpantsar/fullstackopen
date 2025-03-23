interface ExerciseMetrics {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Exercises {
  exerciseHours: number[];
  targetValue: number;
}

const log = (paramName: string, value: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(paramName, value);
  }
};

const parseExerciseArguments = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const targetValue = Number(args[2]);
  if (isNaN(targetValue) || targetValue < 0) {
    throw new Error("Invalid target value, must be a positive number");
  }

  const exerciseHours = args.slice(3).map((arg) => {
    const hours = Number(arg);
    if (isNaN(hours)) {
      throw new Error(`Invalid number in exercise hours: ${arg}`);
    }
    return hours;
  });

  if (exerciseHours.length < 1) {
    throw new Error("At least one exercise hour must be provided");
  }

  return {
    exerciseHours,
    targetValue,
  };
};

const calculateStatistics = ({ exerciseHours, targetValue }: Exercises) => {
  log("exerciseHours", exerciseHours);
  log("targetValue", targetValue);

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= targetValue;
  const rating =
    average >= targetValue
      ? 3
      : average >= targetValue / 2
      ? 2
      : average >= targetValue / 3
      ? 1
      : 0;
  const ratingDescription =
    rating === 3
      ? "Great job! You're doing amazing!"
      : rating === 2
      ? "You're doing well. Keep it up!"
      : rating === 1
      ? "Not too bad but could be better."
      : "You can do better.";

  const metrics: ExerciseMetrics = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average,
  };

  console.log(metrics);
};

try {
  const { exerciseHours, targetValue } = parseExerciseArguments(process.argv);
  calculateStatistics({ exerciseHours, targetValue });
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
