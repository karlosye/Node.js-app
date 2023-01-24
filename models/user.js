// define a user model

const { Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = User;
