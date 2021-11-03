const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const passport = require("passport");
const catchAsync = require("../utilities/catchAsync");
const user = require("../controllers/users");

router
  .route("/register")
  .get(user.renderRegisterForm)
  .post(catchAsync(user.registerUser));

router
  .route("/login")
  .get(user.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.loginUser
  );

router.get("/logout", user.logoutUser);

module.exports = router;
