const router = require("express").Router();
const util = require("../util");
const middleware = require("../../utils/middleware");
const { Post, Comment } = require("../../models");

module.exports = router;

router.get("/", (req, res) => {
    util.SafeGetAll(res, Post, []);
});

router.get("/:id", (req, res) => {
    util.SafeGetByID(req.params.id, res, Post, [])
});

router.get("/:id/comment", (req, res) => {
    util.SafeGetByID(req.params.id, res, Post, [{ model: Comment }])
});

router.post("/:id/comment", middleware.verifyLoggedIn, (req, res) => {
    util.SafeCreate(res, Comment, {
        Content: req.body.Content,
        PostID: req.params.id,
        UserID: req.session.userID
    })
});

router.post("/", middleware.verifyLoggedIn, (req, res) => {
    util.SafeCreate(res, Post, {
        Title: req.body.Title,
        Content: req.body.Content,
        UserID: req.session.userID
    });
});

router.put("/:id", middleware.verifyLoggedIn, (req, res) => {
    util.SafeRequest(res, async (res) => {
        let post = await Post.findByPk(req.params.id);

        if (req.session.userID === post.get().UserID) {
            post.set({
                Title: req.body.Title,
                Content: req.body.Content 
            });

            post = await post.save();

            res.json(JSON.stringify(post));
        } else {
            res.status(401).json("Unauthorized");
        }
    });
});

router.delete("/:id", middleware.verifyLoggedIn, (req, res) => {
    util.SafeRequest(res, async (res) => {
        let post = await Post.findByPk(req.params.id);

        if (req.session.userID === post.get().UserID) {

            post = await post.destroy();

            res.json(JSON.stringify(post));
        } else {
            res.status(401).json("Unauthorized");
        }
    });
});