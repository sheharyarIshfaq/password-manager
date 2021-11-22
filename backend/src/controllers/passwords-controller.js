const { validationResult } = require("express-validator");

const Password = require("../models/password");

const getAllPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find({ creator: req.user.id });
    res.json(passwords);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const addPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Invalid inputs passed, check your data" });
  }

  const { website, title, userName, password } = req.body;

  const newPassword = new Password({
    website,
    title,
    userName,
    password,
    creator: req.user.id,
  });

  try {
    await newPassword.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  res.json({
    id: newPassword.id,
    website: newPassword.website,
    title: newPassword.title,
    creator: newPassword.creator,
  });
};

module.exports = { getAllPasswords, addPassword };
