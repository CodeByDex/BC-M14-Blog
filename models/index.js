const {User, UserPassword} = require("./User");
const {Post, Comment} = require("./Post");

User.hasMany(UserPassword, {
    foreignKey: "UserID",
    onDelete: "CASCADE"
});

UserPassword.belongsTo(User, {
    foreignKey: "UserID"
});

User.hasMany(Post, {
    foreignKey: "UserID",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "UserID"
});

User.hasMany(Comment, {
    foreignKey: "UserID",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "UserID"
});

Post.hasMany(Comment, {
    foreignKey: "PostID", 
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: "PostID"
});


