const express = require("express");
const router = express.Router();
router.get("/register", (req, res) => {
  res.json("register page");
});
router.get("/login", (req, res) => {
  res.json("login page");
});
module.exports = router;
