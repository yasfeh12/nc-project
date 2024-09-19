const { fetchAllUsers } = require("../models/model");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};
