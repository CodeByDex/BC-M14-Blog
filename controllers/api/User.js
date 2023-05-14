const router = require("express").Router();
const util = require("../util");
const {User, UserPassword} = require("../../models/User");

router.post("/", async (req, res) => {
    util.SafeRequest(res, async (res) => {
        let newUser = await User.create({
            UserName: req.body.UserName
        });

        res.json(newUser);
    })
});

module.exports = router;