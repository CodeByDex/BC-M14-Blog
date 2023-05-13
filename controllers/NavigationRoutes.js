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

module.exports = router;