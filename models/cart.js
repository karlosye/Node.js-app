// create a cart model

const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

// define a schema
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Cart;
