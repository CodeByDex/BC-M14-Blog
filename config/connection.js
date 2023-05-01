require("dotenv").config();

const Sequelize = require("sequelize");

const db = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL, {
        host: "localhost",
        dialect: "mysql",
        define: {
            underscored: false,
            freezeTableName: true,
            timestamps: true
        } })
    : new Sequelize(process.env.DB_Name, 
        process.env.DB_User,
        process.env.DB_PW,
        {
            host: "localhost",
            dialect: "mysql",
            define: {
                underscored: false,
                freezeTableName: true,
                timestamps: true
            }
        }
        );

let foo = new Sequelize()

module.exports = db;