interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  exerciseHours: number[];
  targetValue: number;
}

const log = (paramName: string, value: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(paramName, value);
  }
};

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const targetValue = Number(args[2]);
  const exerciseHours = args.slice(3).map((arg) => {
    const num = Number(arg);
    if (isNaN(num) || num < 0) {
      throw new Error("All exercise hours must be non-negative numbers");
    }
    return num;
  });

  log("targetValue", targetValue);
  log("exerciseHours", exerciseHours);

  if (isNaN(targetValue) || targetValue < 0) {
    throw new Error("Target value must be a non-negative number");
  }

  return {
    targetValue,
    exerciseHours,
  };
};

export const calculateStatistics = (
  exerciseHours: number[],
  targetValue: number
) => {
  log("exerciseHours", exerciseHours);
  log("targetValue", targetValue);

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= targetValue;
  const rating =
    average >= targetValue ? 3 : average >= targetValue / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job! You're doing amazing!"
      : rating === 2
      ? "You're doing well. Keep it up!"
      : "Not too bad but could be better.";

  const statistics: ExerciseStats = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average,
  };

  return statistics;
};

// Check if the module is run directly from the command line with npm run calculateExercises
// If so, parse the arguments and calculate the exercise statistics
if (require.main === module) {
  try {
    const { exerciseHours, targetValue } = parseExerciseArguments(process.argv);
    console.log(calculateStatistics(exerciseHours, targetValue));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
