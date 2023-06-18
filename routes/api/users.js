const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const userServiceModel = require("../../model/userService/userService");
const {
  createUserValidation,
  createLoginValidation,
  createIdValidation,
  createEditValidation,
  createIsBusinessValidation,
} = require("../../validation/authValidationService");
const normalizedUser = require("../../model/userService/helpers/normalizationUser");
const jwt = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authMiddleware = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const permissionsUserMiddleware = require("../../middleware/userPermissionMiddlewaew");

router.post("/", async (req, res) => {
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
router.get(
  "/",
  authMiddleware,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const allUsers = await userServiceModel.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.get(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      console.log("kjgvjhfjhdf");
      const userById = await userServiceModel.getAUserById(req.params.id);
      res.json(userById);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.put(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, false),
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      await createEditValidation(req.body);
      req.body = normalizedUser(req.body);
      await userServiceModel.editUser(req.params.id, req.body);
      res.json(req.body);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, false),
  async (req, res) => {
    try {
      await createIsBusinessValidation(req.body);

      await createIdValidation(req.params.id);

      await userServiceModel.updateIsBusiness(req.params.id, req.body);
      res.json({ msg: "updated" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.delete(
  "/:id",
  authMiddleware,
  permissionsUserMiddleware(true, true),
  async (req, res) => {
    try {
      await createIdValidation(req.params.id);
      await userServiceModel.deletUser(req.params.id);
      res.json({ msg: "user deleted" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
module.exports = router;
