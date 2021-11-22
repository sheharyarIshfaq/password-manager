const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");

const router = express.Router();

//Router for signing up a new user
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

//Router for loging in an existing user
router.post("/login", usersController.login);

module.exports = router;
