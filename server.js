const express = require("express");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const {v4: uuidv4} = require("uuid");
const middleware = require("./utils/middleware");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: uuidv4(),
    cookie: { secure: true},
    resave: false,
    saveUninitialized: false
};

if (process.env.landscape === "local"){
    sess.cookie.secure = false;
}

app.use(session(sess));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use([middleware.localLoggedIn, middleware.localUserId]);

app.use(routes);

async function startApp() {
    const seq = await sequelize.sync({force: false});

    app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
}

startApp();