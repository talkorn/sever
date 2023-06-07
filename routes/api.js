const express = require("express");
const router = express.Router();
const cardsRouter = require("./api/cards");
const authRoter = require("./api/auth");

router.get("/", (req, res) => {
  res.json({ msg: "sub rout" });
});
router.use("/cards", cardsRouter);
router.use("/auth", authRoter);

module.exports = router;
