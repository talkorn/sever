const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cardsService/cardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizedCard = require("../../model/cardsService/helpers/normalizationCard");
const authMiddleware = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");

router.post(
  "/",
  authMiddleware,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      await cardsValidationService.createCardValidation(req.body);
      let normalCard = await normalizedCard(req.body, req.userData._id);
      const dataFromMongoose = await cardServiceModel.createCard(normalCard);
      console.log("dataFromMongoose", dataFromMongoose);
      res.json({ msg: "new card" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const allCards = await cardServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/my-cards", authMiddleware, async (req, res) => {
  try {
    console.log(req.userData._id);
    console.log("jgjydfhd");
    const allMyCards = await cardServiceModel.getAllMyCards(req.userData.id);
    res.json(allMyCards);
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
router.put(
  "/:id",
  authMiddleware,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      console.log("reqbody", req.body);
      await cardsValidationService.createCardValidation(req.body);

      let normalCard = await normalizedCard(req.body, req.userData._id);
      const newCard = await cardServiceModel.updateCard(
        req.params.id,
        normalCard
      );
      res.json(newCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const card = await cardServiceModel.getCardById(req.params.id);
    const userId = req.userData._id;
    const isLikedAlready = card.likes.some((item) => item === userId);
    if (!isLikedAlready) {
      card.likes.push(userId);
    } else {
      const filteredLikes = card.likes.filter((item) => item !== userId);
      card.likes = filteredLikes;
    }

    await cardServiceModel.likesCard(req.params.id, card.likes);
    res.json("Likes changed");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      const cardDeleted = await cardServiceModel.deleteCard(req.params.id);
      if (cardDeleted) {
        res.json({ msg: "card deleted" });
      } else {
        res.json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
