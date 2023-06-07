const joiCardsValidation = require("./joi/cardsValidation");

const validatorOption = "Joi";

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};
const idValidation = (id) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateIdSchema(id);
  }
  throw new Error("validator undefined");
};

module.exports = { createCardValidation, idValidation };
