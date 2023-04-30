const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection");

class User extends Model {};
class UserPassword extends Model {};

User.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [5,20]
            }
        },
        Status: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "A",
            validate: {
                isIn: ["A", "I", "S", "L"]
            }
        },
        LoginAttempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true,
                min: 0
            }
        },
        LastLogin: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true
            }
        }
    },
    {
        sequelize: db,
        paranoid: true
    }
);

UserPassword.init(
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
        UserPassword: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [5,20]
            }
        },
        Status: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "A",
            validate: {
                isIn: ["A", "I", "T"]
            }
        }
    }, 
    {
        sequelize: db
    }
)

module.exports = {
    User,
    UserPassword
}

/**
 * https://sequelize.org/api/v6/class/src/model.js~model#static-method-init
 * column.set for password field
 */