const sq = require("../../config/connection");
const {User, UserPassword} = require("../../models/User");
const {Post, Comment} = require("../../models/Post");

async function seedAll() {
    await sq.sync({force: true});

    process.exit(0);
}

seedAll();