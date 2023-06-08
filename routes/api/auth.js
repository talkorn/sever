const express = require("express");
const router = express.Router();
const bcrypt = require("../../config/bcrypt");
const userServiceModel = require("../../model/user/userService");
const {
  createUserValidation,
} = require("../../validation/authValidationService");
const normalizedUser = require("../../model/user/helpers/normalizationUser");
router.post("/register", async (req, res) => {
  await createUserValidation(req.body);
  req.body.password = await bcrypt.generteHash(req.body.password);
  req.body = normalizedUser(req.body);
  await userServiceModel.createUser(req.body);
  res.json("register");
});

router.post("/login", (req, res) => {
  res.json("login page");
});
module.exports = router;
