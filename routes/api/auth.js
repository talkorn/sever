const express = require("express");
const router = express.Router();
const bcrypt = require("../../config/bcrypt");
const userServiceModel = require("../../model/user/userService");
const {
  createUserValidation,
  createLoginValidation,
} = require("../../validation/authValidationService");
const normalizedUser = require("../../model/user/helpers/normalizationUser");
const jwt = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");

router.post("/register", async (req, res) => {
  try {
    await createUserValidation(req.body);
    req.body.password = await bcrypt.generteHash(req.body.password);
    req.body = normalizedUser(req.body);
    await userServiceModel.createUser(req.body);
    res.json("register");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    await createLoginValidation(req.body);
    const user = await userServiceModel.getUserByEmail(req.body.email);
    if (!user) throw new CustomError("invalid email and/or password");
    const isPasswordCorrect = await bcrypt.compareHush(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new CustomError("invalid email and/or password");
    }
    const token = await jwt.generateToken({
      _id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
