const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const bcrypt = require('bcrypt')

class User extends Model {
    static async createUser(UserName, Password) {

        // if (password.length < 8) {
        //   throw new Error('Variable length must be at least 8 characters')
        // }

        const hash = await bcrypt.hash(Password, 5)

        //We want to make sure ceate user and password both occur
        //so isolating to a single transaction.
        const t = await db.transaction();

        try {

            const newUser = await User.create({
                UserName
            },
                {
                    transaction: t
                });

            await UserPassword.create({
                UserID: newUser.ID,
                Password: hash
            },
                {
                    transaction: t
                });

            t.commit();

            return newUser;
        } catch (err) {
            t.rollback();
            console.log(err)
            throw new Error("Error Creating New User");
        }
    };

    async checkPassword(password) {
        const UP = await UserPassword.findOne({ where: { UserID: this.ID } });
        const passwordCheck = await bcrypt.compareSync(password, UP.Password);
        return passwordCheck;
    };
};

class UserPassword extends Model { };

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
                len: [5, 20]
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
        Password: {
            type: DataTypes.CHAR(60),
            allowNull: false,
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