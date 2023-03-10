export const validationUtilService = (() => {
  const validationRules = {
    signup: {
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
    },
    login: {
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
    },
  };

  return {
    validationRules,
  };
})();
