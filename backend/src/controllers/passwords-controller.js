const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");

const Password = require("../models/password");

const getAllPasswords = async (req, res, next) => {
  try {
    const userPasswords = await Password.find({ creator: req.user.id });

    const decryptedPasswords = userPasswords.map((userPassword) => {
      return {
        id: userPassword.id,
        website: userPassword.website,
        title: userPassword.title,
        userName: userPassword.userName,
        creator: userPassword.creator,
        password: CryptoJS.AES.decrypt(
          userPassword.password,
          process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8),
        createdAt: userPassword.createdAt,
        updatedAt: userPassword.updatedAt,
      };
    });

    res.json(decryptedPasswords);
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

  let encryptedPassword;

  try {
    encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  const newPassword = new Password({
    website,
    title,
    userName,
    password: encryptedPassword,
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

const updatePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Invalid inputs passed, check your data" });
  }

  const { userName, password } = req.body;

  let encryptedPassword;

  try {
    encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  let existingPassword;

  try {
    existingPassword = await Password.findById(req.params.id);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  if (existingPassword.creator.toString() !== req.user.id) {
    return res
      .status(404)
      .json({ error: "You are not allowed to perform this task" });
  }

  existingPassword.userName = userName;
  existingPassword.password = encryptedPassword;

  try {
    await existingPassword.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  res.json({
    id: existingPassword.id,
    website: existingPassword.website,
    title: existingPassword.title,
    creator: existingPassword.creator,
  });
};

const deletePassword = async (req, res, next) => {
  let existingPassword;
  try {
    existingPassword = await Password.findById(req.params.id);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  if (!existingPassword) {
    return res.status(404).json({ error: "Not Found!" });
  }

  if (existingPassword.creator.toString() !== req.user.id) {
    return res
      .status(404)
      .json({ error: "You are not allowed to perform this task" });
  }

  try {
    await Password.findByIdAndDelete(req.params.id);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }

  res.json({ message: "Succesfully deleted the note" });
};

module.exports = {
  getAllPasswords,
  addPassword,
  updatePassword,
  deletePassword,
};
