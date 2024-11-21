const express = require("express");
const router = express.Router();

/*  /user/  */

router.get("/register", (req, res) => {
    res.render("register")
});

router.post("/get-user-data", (req, res) => {
    console.log(req.body);
    res.redirect("/")
})

module.exports = router;