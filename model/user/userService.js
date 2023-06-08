const User = require("./User");

const createUser = async (userToSave) => {
  console.log("userToSave", userToSave);
  let user = new User(userToSave);
  return user.save();
};

module.exports = {
  createUser,
};
