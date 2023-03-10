import { validationUtilService } from "./validationUtilService";

export const appUtilService = (() => {
  const rules = {
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
    password: {
      minLength: 8,
      required: true,
      // TODO: Will do it later
      // custom: (value, formValues) => {
      //   if (!/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]+$/.test(value)) {
      //     return "Password should be mix of letters and symbols.";
      //   }
      // },
    },
    confirmPassword: {
      required: true,
      custom: (value, formValues) => {
        if (value !== formValues.password) {
          return "Password and confirm password should be same.";
        }
      },
    },
    termsAndConditionAccepted: {
      required: true,
    },
    smsNotificationAllowed: {
      required: false,
    },
  };

  function validateHeightWeightAndAge(height, weight, age) {
    // prettier-ignore
    return (
      !isNaN(height) &&
      !isNaN(weight) &&
      !isNaN(age) &&
      height > 0 &&
      weight > 0 &&
      (age > 0 &&
      age <= 100)
    );
  }

  function validateProtienAndFat(protien, fat) {
    // prettier-ignore
    return !isNaN(protien) &&
      !isNaN(fat) &&
      (protien >= 0.7 &&
      protien <= 3.5) &&
      (fat >= 0.7 &&
      fat <= 2.2);
  }

  function checkObjectValues(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if (!checkObjectValues(obj[key])) {
          return false;
        }
      } else if (
        obj[key] === undefined ||
        obj[key] === null ||
        obj[key] == ""
      ) {
        return false;
      }
    }
    return true;
  }

  function validateForm(formValues, formKey) {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateField(
        formValues[key],
        validationUtilService.validationRules[formKey][key],
        formValues,
        key
      );
      if (!!error) errors[key] = error;
    });
    return errors;
  }

  function validateField(inputValue, rules, formValues) {
    let errorMessage = "";
    // Required rule
    if (rules.required && !inputValue) {
      errorMessage = "This field is required";
      return errorMessage;
    }

    // Minimum length rule
    if (rules.minLength && inputValue.length < rules.minLength) {
      errorMessage = `This field must be at least ${rules.minLength} characters long`;
      return errorMessage;
    }

    // Maximum length rule
    if (rules.maxLength && inputValue.length > rules.maxLength) {
      errorMessage = `This field must be no more than ${rules.maxLength} characters long`;
      return errorMessage;
    }
    // Email rule
    if (rules.email && !/\S+@\S+\.\S+/.test(inputValue)) {
      errorMessage = "Please enter a valid email address";
      return errorMessage;
    }

    // Custom rule
    if (rules.custom && typeof rules.custom === "function") {
      errorMessage = rules.custom(inputValue, formValues);
      return errorMessage;
    }

    return errorMessage;
  }

  function convertObjectIntoQueryParams(object) {
    if (!object) {
      return;
    }
    let params = "";
    Object.keys(object).forEach((key) => {
      if (params.length && object[key]) {
        params += "&";
      }
      if (object[key]) {
        params += `${key}=${object[key]}`;
      }
    });

    return params;
  }

  return {
    validateForm: validateForm,
    checkObjectValues: checkObjectValues,
    validateProtienAndFat: validateProtienAndFat,
    validateHeightWeightAndAge: validateHeightWeightAndAge,
    convertObjectIntoQueryParams: convertObjectIntoQueryParams,
  };
})();
