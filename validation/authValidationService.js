const joiUserValidation = require("./joi/userValidation");

const validatorOption = "Joi";

const createUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateUserSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = { createUserValidation };
