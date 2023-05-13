const db = require("../../config/connection");
const {User, Post, Comment} = require("../../models");

async function seedAll() {
    await db.sync({
        force: true
    });

    await User.bulkCreate([
        {
            UserName: "Test1"
        },
        {
            UserName: "Test2"
        }
    ]);

    await Post.bulkCreate([
        {
            UserID: 1,
            Title: "Post 1",
            Content: "Some Content",
            Comments: [
                {
                    UserID: 2,
                    Content: "Comment"
                },
                {
                    UserID: 1,
                    Content: "Comment response"
                },
                {
                    UserID: 2,
                    Content: "Comment 2"
                }
            ]
        },
        {
            UserID: 2,
            Title: "Post 2",
            Content: "Some Content 2"
        }
    ], {
        include: [Comment]
    });

    process.exit(0);
}

seedAll();