const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Invalid inputs passed, check your data" });
  }
  const { name, email, password } = req.body;

  //checking if the user already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }

  if (existingUser) {
    return res
      .status(422)
      .json({ error: "User already exists, please login instead" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }

  let token;

  try {
    token = jwt.sign({ id: createdUser.id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }

  res.json({ name, email, id: createdUser.id, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Logging in failed, please try again later" });
  }

  if (!existingUser) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, could not log in" });
  }
  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, could not log in" });
  }

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, could not log in" });
  }

  let token;

  try {
    token = jwt.sign({ id: existingUser.id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Logging in failed, please try again later" });
  }

  res.json({
    name: existingUser.name,
    email: existingUser.email,
    id: existingUser.id,
    token: token,
  });
};

const getUser = async (req, res, next) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = { signup, login, getUser };
