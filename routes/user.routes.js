const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

/*  /user/  */

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/get-user-data",

  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 3 }),
  body("email").trim().isEmail(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("found data validation errors");
      res.send(errors);
    }
    console.log(req.body);
    res.redirect("/");
  }
);

module.exports = router;
