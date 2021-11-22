const express = require("express");
const checkAuth = require("../middleware/check-auth");
const passwordsController = require("../controllers/passwords-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", checkAuth, passwordsController.getAllPasswords);

router.post(
  "/new",
  checkAuth,
  [
    check("website").isURL(),
    check("title").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  passwordsController.addPassword
);

router.patch(
  "/update/:id",
  checkAuth,
  [check("userName").not().isEmpty(), check("password").isLength({ min: 6 })],
  passwordsController.updatePassword
);

module.exports = router;
