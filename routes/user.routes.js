const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
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
      return res.status(400).json({
        errors: errors.array(),
        message: "invalid data",
      });
    }
    const { username, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        throw new Error("User already Exists");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
      });
      await newUser.save();

      console.log("user created successfully");
      res.redirect("/");
    } catch (error) {
      res.status(409).json(error.message);
    }
  }
);

module.exports = router;
