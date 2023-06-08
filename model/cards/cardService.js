const Card = require("./Card");

const createCard = async (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};
const getAllCards = () => {
  return Card.find();
};
const getCardById = (id) => {
  return Card.findById(id);
};
const updateCard = (id, newCard) => {
  return Card.findByIdAndUpdate(id, newCard, { new: true });
};
const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};
