const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};
const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
};
const updateCard = (id, newCard) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, newCard);
  }
};
const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};
