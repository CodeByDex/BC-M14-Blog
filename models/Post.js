const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection");

class Post extends Model {};
class Comment extends Model {};

Post.init (
    {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "ID"
            }
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 255]
            }
        },
        Content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [50, 5000]
            }
        }
    },
    {
        sequelize: db,
        paranoid: true
    }
);

Comment.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "ID"
            },
        },
        PostID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Post",
                key: "ID"
            }
        },
        Content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [5, 500]
            }
        }
    },
    {
        sequelize: db,
        paranoid: true
    }
);

module.exports = {
    Post,
    Comment
}