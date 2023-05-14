const router = require("express").Router();
const util = require("./util");
const middleware = require("../utils/middleware");
const {Post, Comment, User} = require("../models");


router.get("/", (req, res) => {
    util.SafeRequest(res, async (res) => {
        let posts = await Post.findAll({
            include: [User]
        });

        if (posts) {
            posts = renderBlogPreview(posts);
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
    util.SafeRequest(res, async (res) => {
        let post = await Post.findByPk(req.params.id, {
            include: [User, {
                    model: Comment,
                    include: User
                }
            ]
        });

        if (post) {
            post = post.get();
            post.User = post.User.get();
            post.Comments = post.Comments.map(x => {
                let comment = x.get();
                comment.User = comment.User.get();
                return comment;
            });
        } else {
            post = {};
        }

        res.render("blog", post);
    })
})

router.get("/dashboard", middleware.verifyLoggedIn, (req, res) => {
    util.SafeRequest(res, async (res) => {
        let posts = await Post.findAll({
            include: [User],
            where: {
                UserID: req.session.userID
            }
        });

        posts = renderBlogPreview(posts);
    })

    res.render("dashboard", posts);
})

module.exports = router;

function renderBlogPreview(posts) {
    posts = posts.map(x => {
        let post = x.get();
        post.User = x.User.get();

        return post;
    });
    return posts;
}
