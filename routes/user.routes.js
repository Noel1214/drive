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
  "/user-register",

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

      // if (userExists) {
      //   throw new Error("User already Exists");
      // }

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

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/user-login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 3 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("invalid data");
        console.log(errors);
        return res.status(400).json({ message: "invalid data" });
      }

      const { email, password } = req.body;
      console.log(password);
      const userDetails = await User.findOne({ email: email });

      if (!userDetails) {
        console.log("user dose not exists");
        return res.status(404).json({ message: "user dose not exists" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        userDetails.password
      );
      console.log(isPasswordCorrect);

      if (!isPasswordCorrect) {
        console.log("password incorrect");
        return res.status(401).json({ message: "password incorrect" });
      }

      res.cookie("loggedIn", true, { httpOnly: true, secure: true });
      return res.status(200).json({ message: "Login successful" });
      
    } catch (error) {
      console.log("error while loging in", error.message);
      res.status(500).json({ message: "internal server error login failed" });
    }
  }
);

module.exports = router;
