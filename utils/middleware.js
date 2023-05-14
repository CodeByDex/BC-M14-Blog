function localLoggedIn(req, res, next) {
    if (!req.session.loggedIn) {
        res.locals.loggedIn = false;
    } else {
        res.locals.loggedIn = true;
    }

    next();
};

function localUserId(req, res, next) {
    if (!req.session.userID) {
        delete res.locals.userId;
    } else {
        res.locals.userID = req.session.userID;
    }

    next();
}

function verifyLoggedIn(req, res, next) {
    if (!req.session.loggedIn) {
        res.status(401).render("login");
        return;
    }

    next();
};

module.exports = {
    localLoggedIn,
    localUserId,
    verifyLoggedIn
}
