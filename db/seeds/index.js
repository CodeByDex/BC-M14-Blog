const db = require("../../config/connection");
const {User} = require("../../models/User");
const {Post, Comment} = require("../../models/Post");

async function seedAll() {
    await db.sync({
        force: true, 
        define: {
            underscored: false,
            freezeTableName: true,
            timestamps: true
        }
    })

    process.exit(0);
}

seedAll();