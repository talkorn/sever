const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizedCard = require("../../model/cards/helpers/normalizationCard");

router.post("/", async (req, res) => {
  try {
    await cardsValidationService.createCardValidation(req.body);
    let normalCard = await normalizedCard(req.body, "647b00d1b79c0da7c39e3180");
    const dataFromMongoose = await cardServiceModel.createCard(normalCard);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "new card" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCards = await cardServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const cardById = await cardServiceModel.getCardById(req.params.id);
    res.json(cardById);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    await cardsValidationService.createCardValidation(req.body);
    let normalCard = await normalizedCard(req.body, "647b00d1b79c0da7c39e3180");
    const newCard = await cardServiceModel.updateCard(
      req.params.id,
      normalCard
    );
    res.json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
