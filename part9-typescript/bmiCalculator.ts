// https://en.wikipedia.org/wiki/Body_mass_index#Categories
interface BodyMetrics {
  heightCm: number;
  massKg: number;
}

interface BMIResponse {
  bmiValue: number;
  bmiCategory: string;
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
const getBmiCategory = (bmi: number): string => {
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi >= 35 && bmi <= 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

export const calculateBmi = (heightCm: number, massKg: number): BMIResponse => {
  const bmiValue: number = Number(
    (massKg / Math.pow(heightCm / 100, 2)).toFixed(2)
  );
  const bmiCategory = getBmiCategory(bmiValue);
  return { bmiValue, bmiCategory };
};

// Check if the module is run directly from the command line with npm run calculateBmi
// If so, parse the arguments and calculate the BMI
if (require.main === module) {
  try {
    const { heightCm, massKg } = parseBmiArguments(process.argv);
    const { bmiValue, bmiCategory } = calculateBmi(heightCm, massKg);

    console.log(
      `BMI for ${heightCm} cm and ${massKg} kg person is: ${bmiValue}`
    );
    console.log(bmiCategory);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
