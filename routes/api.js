const express = require("express");
const router = express.Router();
const cardsRouter = require("./api/cards");
//const authRoter = require("./api/auth");
const usersRouter = require("./api/users");
router.get("/", (req, res) => {
  res.json({ msg: "sub rout" });
});
router.use("/cards", cardsRouter);
//router.use("/auth", authRoter);
router.use("/users", usersRouter);
module.exports = router;
