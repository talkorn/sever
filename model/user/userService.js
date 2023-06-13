const User = require("./User");

const createUser = async (userToSave) => {
  let user = new User(userToSave);
  return user.save();
};
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
const getAllUsers = async () => {
  return User.find();
};
module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
};
