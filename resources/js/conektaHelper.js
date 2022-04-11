const conektaHelper = {
  initConekta: () => {
    console.log("Setting public key");
    console.log(CONEKTA_PUBLIC_KEY);
    window.Conekta.setPublicKey(CONEKTA_PUBLIC_KEY);
  },
  getCardBrand: (cardNum) => {
    return window.Conekta.card.getBrand(cardNum);
  },
  validateCardNumber: (cardNum) => {
    return window.Conekta.card.validateNumber(cardNum);
  },
  validateCvc: (cvc) => {
    return window.Conekta.card.validateCVC(cvc);
  },
  validateExpirationDate: (expMonth, expYear) => {
    return window.Conekta.card.validateExpirationDate(expMonth, expYear);
  },
  tokenize: (cardNum, cardName, expMonth, expYear, cvc, didSucceed, didFail) => {
    const tokenParams = {
      card: {
        number: cardNum,
        name: cardName,
        exp_year: expYear,
        exp_month: expMonth,
        cvc,
      },
    };

    window.Conekta.Token.create(tokenParams, didSucceed, didFail);
  },
};

export default conektaHelper;
