const router = require("express").Router();
const util = require("../util");
const {Post, Comment} = require("../../models");

module.exports = router;

router.get("/", (req, res) => {
    util.SafeGetAll(res, Post, []);
})

router.get("/:id", (req, res) => {
    util.SafeGetByID(req.params.id, res, Post, [])
});

router.get("/:id/comment", (req, res) => {
    util.SafeGetByID(req.params.id, res, Post, [{model: Comment}])
} )