/* const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const userServiceModel = require("../../model/userService/userService");
const {
  createUserValidation,
  createLoginValidation,
} = require("../../validation/authValidationService");
const normalizedUser = require("../../model/userService/helpers/normalizationUser");
const jwt = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");

router.post("/register", async (req, res) => {
  try {
    await createUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
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
    console.log(
      "req.body.password",
      req.body.password,
      "user.password",
      user.password
    );
    if (!user) throw new CustomError("invalid email and/or password");
    const isPasswordCorrect = await hashService.cmpHash(
      req.body.password,
      user.password
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
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
 */
