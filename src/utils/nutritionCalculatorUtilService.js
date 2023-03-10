export const nutritionCalculatorUtilService = (() => {
  let TDEE = -1;
  let caloriesPerDay = 0;

  const calculateIntakeCalories = (userDetails) => {
    const BMR = calculateBMR(
      userDetails.weight,
      userDetails.height,
      userDetails.age,
      userDetails.gender
    );
    if (userDetails.activityLevel === "Sedentary") {
      TDEE = BMR * 1.2;
    } else if (userDetails.activityLevel === "Lightly Active") {
      TDEE = BMR * 1.375;
    } else if (userDetails.activityLevel === "Moderately Active") {
      TDEE = BMR * 1.55;
    } else if (userDetails.activityLevel === "Very Active") {
      TDEE = BMR * 1.725;
    } else if (userDetails.activityLevel === "Extremely Active") {
      TDEE = BMR * 1.9;
    }

    // Calculate number of calories per day based on goal
    if (userDetails.goal === "Lose Weight") {
      caloriesPerDay = TDEE - 500;
    } else if (userDetails.goal === "Maintain Weight") {
      caloriesPerDay = TDEE;
    } else {
      caloriesPerDay = TDEE + 500;
    }

    return caloriesPerDay;
  };

  const calculateBMR = (weight, height, age, gender) => {
    height = convertHeightIntoCentimeter(height);
    weight = convertWeightIntoKg(weight);

    // Calculate BMR
    // Male: (88.4 + 13.4 x weight in kilograms) + (4.8 x height in centimeters) – (5.68 x age)
    // Female: (447.6 + 9.25 x weight in kilograms) + (3.10 x height in centimeters) – (4.33 x age)
    if (gender === "Male") {
      return Math.floor(
        88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      );
    }
    // for female
    return Math.floor(447.593 + 9.247 * weight + 3.098 * height - 4.33 * age);
  };
  const convertWeightIntoKg = ({ value, unit }) => {
    if (unit == "lbs") {
      return Number(value) * 0.45359237;
    } else if (unit === "g") {
      return Number(value) * 1000;
    }
    return Number(value);
  };
  const convertHeightIntoCentimeter = ({ value, unit }) => {
    // Convert height from meter to centimeter
    if (unit === "m") {
      return Number(value) * 100;
    }
    // Convert height from Inches to centimeter
    else if (unit === "in") {
      return Number(value) * 2.54;
    }
    // Convert height from Feet to centimeter
    else if (unit === "ft") {
      return Number(value) * 30.48;
    }
    return Number(value);
  };

  function calculateProtienInGram(protienPercentage, intakeCalories) {
    return ((protienPercentage / 100) * (intakeCalories / 4)).toFixed(2);
  }
  function calculateFatInGram(fatPercentage, intakeCalories) {
    return ((fatPercentage / 100) * (intakeCalories / 9)).toFixed(2);
  }
  function calculateCarbohyderateInGram(
    carbohyderatePercentage,
    intakeCalories
  ) {
    return ((carbohyderatePercentage / 100) * (intakeCalories / 4)).toFixed(2);
  }

  function getProtienFatAndCarbohyderate(
    protienPercentage,
    fatPercentage,
    carbohyderatePercentage,
    intakeCalories
  ) {
    const protien = calculateProtienInGram(protienPercentage, intakeCalories);
    const fat = calculateFatInGram(fatPercentage, intakeCalories);
    const carbohyderate = calculateCarbohyderateInGram(
      carbohyderatePercentage,
      intakeCalories
    );

    return {
      protien,
      fat,
      carbohyderate,
    };
  }

  return {
    calculateIntakeCalories: calculateIntakeCalories,
    convertWeightIntoKg: convertWeightIntoKg,
    getProtienFatAndCarbohyderate: getProtienFatAndCarbohyderate,
  };
})();
