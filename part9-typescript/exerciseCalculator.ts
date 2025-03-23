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

const parseExerciseArguments = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const exercisesArray: Exercises["exerciseHours"] = args
    .slice(2)
    .map((arg) => Number(arg))
    .filter((arg) => !isNaN(arg));
  const targetValue = Number(args[3]);

  console.log(exercisesArray, targetValue);

  if (exercisesArray.length < 1 || targetValue < 0) {
    throw new Error("Exercise hours and target value should be provided");
  }

  if (!isNaN(targetValue) && exercisesArray.every((arg) => !isNaN(arg))) {
    return {
      exerciseHours: exercisesArray,
      targetValue: targetValue,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateStatistics = (
  exerciseHours: Exercises["exerciseHours"],
  targetValue: Exercises["targetValue"]
) => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= targetValue;
  const rating =
    average >= targetValue ? 3 : average >= targetValue / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job!"
      : rating === 2
      ? "You're doing well but could be better"
      : rating === 1
      ? "Not too bad but could be better"
      : "You should try harder";

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
  calculateStatistics(exerciseHours, targetValue);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
