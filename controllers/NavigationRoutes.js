const router = require("express").Router();
const util = require("./util");
const {Post, Comment, User} = require("../models");


router.get("/", (req, res) => {
    util.SafeRequest(res, async (res) => {
        let posts = await Post.findAll({
            include: [User]
        });

        if (posts) {
            posts = posts.map(x => {
                let post = x.get();
                post.User = x.User.get();

                return post;
            });
        } else {
            posts = []
        }

        res.render("home", {posts});
    })
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