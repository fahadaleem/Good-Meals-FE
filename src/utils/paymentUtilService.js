export const paymentUtilService = (() => {
  function validateCardNumber(cardNumber) {
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const amexRegEx = /^3[47][0-9]{13}$/;
    const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    const mastercardRegEx = /^5[1-5][0-9]{14}$/;
    // Removing space character from the card number
    cardNumber = cardNumber.replace(/[^\d]/g, "");
    if (visaRegEx.test(cardNumber)) {
      return true;
    } else if (amexRegEx.test(cardNumber)) {
      return true;
    } else if (discoverRegEx.test(cardNumber)) {
      return true;
    } else if (mastercardRegEx.test(cardNumber)) {
      return true;
    }
    return false;
  }

  function validateCvvValid(cvv) {
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(cvv);
  }

  function validateCardExpiry(cardExpiry) {
    const today = new Date();
    if (!cardExpiry) {
      return false;
    }
    const [expMonth, expYear] = cardExpiry.split("/");
    const expiryDate = new Date(
      parseInt(`20${expYear}`),
      parseInt(expMonth) - 1
    );
    return today < expiryDate;
  }

  return {
    validateCardNumber: validateCardNumber,
    validateCvvValid: validateCvvValid,
    validateCardExpiry: validateCardExpiry,
  };
})();
