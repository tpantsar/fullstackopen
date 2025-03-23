// https://en.wikipedia.org/wiki/Body_mass_index#Categories
interface BodyMetrics {
  heightCm: number;
  massKg: number;
}

const parseBmiArguments = (args: string[]): BodyMetrics => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const heightStr = args[2];
  const massStr = args[3];

  if (heightStr.includes(",") || heightStr.includes(".")) {
    throw new Error("Height should be a number in centimeters");
  }

  const height = Number(heightStr);
  const mass = Number(massStr);

  if (height <= 0 || mass <= 0) {
    throw new Error("Height and mass should be positive numbers");
  } else if (height > 300 || mass > 800) {
    throw new Error("Height and mass should be realistic numbers");
  }

  if (!isNaN(height) && !isNaN(mass)) {
    return {
      heightCm: height,
      massKg: mass,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

// Prints the corresponding BMI category based on the BMI value
const printBmiCategory = (bmi: number): void => {
  if (bmi < 16.0) {
    console.log("Underweight (Severe thinness)");
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    console.log("Underweight (Moderate thinness)");
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    console.log("Underweight (Mild thinness)");
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    console.log("Normal range");
  } else if (bmi >= 25 && bmi <= 29.9) {
    console.log("Overweight (Pre-obese)");
  } else if (bmi >= 30 && bmi <= 34.9) {
    console.log("Obese (Class I)");
  } else if (bmi >= 35 && bmi <= 39.9) {
    console.log("Obese (Class II)");
  } else {
    console.log("Obese (Class III)");
  }
};

const calculateBmi = (heightCm: number, massKg: number, printText: string) => {
  const bmi: number = Number((massKg / Math.pow(heightCm / 100, 2)).toFixed(2));
  console.log(printText, bmi);
  printBmiCategory(bmi);
};

try {
  const { heightCm, massKg } = parseBmiArguments(process.argv);
  calculateBmi(
    heightCm,
    massKg,
    `BMI for ${heightCm} cm and ${massKg} kg person is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
