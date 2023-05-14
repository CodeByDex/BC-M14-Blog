const router = require("express").Router();
const util = require("../util");
const {User, UserPassword} = require("../../models/User");

router.post("/", async (req, res) => {
    util.SafeRequest(res, async (res) => {
        let newUser = await User.createUser(req.body.UserName, req.body.Password);

        req.session.save(() => {
            setLoginInfo(req, newUser.ID, res);
    
            res.json(newUser);
        })
    })
});

router.post('/login', async (req, res) => {

    const userData = await User.findOne({ where: { UserName: req.body.UserName } })
    if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    const validPassword = await userData.checkPassword(req.body.Password);

    if (!validPassword) {
        res
            .status(400)
            .json({ message: "wrong password" })
        return;
    }

    req.session.save(() => {
        setLoginInfo(req, userData.ID, res);
        res.status(200).json({
            message: "Logged in!"
        })
    })
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        // Remove the session variables
        req.session.destroy(() => {
            delete res.locals.userID;
            res.locals.loggedIn = false;
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;


function setLoginInfo(req, id, res) {
    req.session.userID = id;
    req.session.loggedIn = true;

    res.locals.userID = id;
    res.locals.loggedIn = true;
}