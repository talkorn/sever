const joiUserValidation = require("./joi/userValidation");
const joiLoginValidation = require("./joi/loginValidation");
const config = require("config");

const validatorOption = config.get("validatorOption");

const createUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUserValidation.validateUserSchema(userInput);
  }
  throw new Error("validator undefind");
};
const createLoginValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = { createUserValidation, createLoginValidation };
