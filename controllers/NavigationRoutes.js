const router = require("express").Router();


router.get("/", (req, res) => {
    res.render("home");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/blog/:id", (req, res) => {
    res.render("blog");
})

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
})

module.exports = router;