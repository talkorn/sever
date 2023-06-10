const joiUserValidation = require("./joi/userValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");

const createUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateUserSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = { createUserValidation };
