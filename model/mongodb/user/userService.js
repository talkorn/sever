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
const getUserById = (id) => {
  return User.findById(id);
};

const editUser = (id, userToSave) => {
  return User.findByIdAndUpdate(id, userToSave);
};
const updateIsBusiness = (id, isBusiness) => {
  return User.findByIdAndUpdate(id, isBusiness);
};
const deletUser = (id) => {
  return User.findByIdAndDelete(id);
};
module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  editUser,
  updateIsBusiness,
  deletUser,
};
