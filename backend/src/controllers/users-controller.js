const { validationResult } = require("express-validator");
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

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Signing up failed, please try again later" });
  }

  res.json({ name, email, id: createdUser.id });
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
  let isValidPassword = existingUser.password === password ? true : false;

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, could not log in" });
  }

  res.json({
    name: existingUser.name,
    email: existingUser.email,
    id: existingUser.id,
  });
};

module.exports = { signup, login };
