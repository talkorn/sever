usersArray = require("./users.json");
cardsArray = require("./cards.json");
const userModelService = require("../model/user/userService");
const cardsModelService = require("../model/cards/cardService");
const { createUserValidation } = require("../validation/authValidationService");
const normalizedUser = require("../model/user/helpers/normalizationUser");
const normalizeCard = require("../model/cards/helpers/normalizationCard");
const bcrypt = require("../config/bcrypt");

const initialData = async () => {
  try {
    let cards = await cardsModelService.getAllCards();
    if (cards.length) {
      return;
    }
    let users = await userModelService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    for (let user of usersArray) {
      await createUserValidation(user);
      user.password = await bcrypt.generteHash(user.password);
      user = normalizedUser(user);

      user_id = await userModelService.createUser(user);
    }
    user_id = user_id._id + "";
    for (let card of cardsArray) {
      card = await normalizeCard(card, user_id);
      await cardsModelService.createCard(card);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};
module.exports = initialData;
