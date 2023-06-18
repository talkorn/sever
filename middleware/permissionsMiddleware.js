const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardService");
const cardsValidationService = require("../validation/cardsValidationService");
/*
    TODO:
        finish isBizSpecific
*/

const checkIfBizOwner = async (iduser, idcard, res, next) => {
  try {
    //! joi the idcard
    console.log("mvhcngc");
    console.log(iduser);
    await cardsValidationService.idValidation(iduser);

    const cardData = await getCardById(idcard);
    if (!cardData) {
      return res.status(400).json({ msg: "card not found" });
    }
    console.log("cardData.user_id", cardData.user_id, "iduser", iduser);
    if (cardData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "you are not the bissunies card owner" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

/*
  isBiz = every biz
  isAdmin = is admin
  isBizOwner = biz owner
*/

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    console.log(
      "isBizOwner",
      isBizOwner,
      "req.userData.isBusiness",
      req.userData.isBusiness
    );
    if (isBizOwner === true) {
      console.log("dfsvsfv");
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    res.status(401).json({ msg: "you are not allowed" });
  };
};

module.exports = permissionsMiddleware;
