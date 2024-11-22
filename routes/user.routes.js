const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

/*  /user/  */

// handles rendering of registration pagge
router.get("/register", (req, res) => {
  res.render("register");
});

// handles registration of new user
router.post(
  "/get-user-data",

  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  body("email").trim().isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("invalid data");
      console.log(errors);
      res.status(400).json({
        errors: errors.array(),
        message: "invalid data",
      });
    }
    // console.log(req.body);
    const { username, email, password } = req.body;
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });
    await newUser.save();

    console.log("user created successfully");
    res.redirect("/");
  }
);

module.exports = router;
