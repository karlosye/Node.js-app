/* const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // return a promise from db.execute()
    return db.execute(
      "INSERT INTO products (title, price, description, imageURL) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageURL]
    );
  }

  static fetchAll() {
    // this will return a promise
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products where products.id = ?", [id]);
  }

  static deleteProduct(id) {
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(dataFilePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);

        // find the require product:
        const product = products.find((item) => {
          return item.id === id;
        });

        const updatedProducts = products.filter((item) => {
          return item.id !== id;
        });

        console.log(updatedProducts);
        fs.writeFile(dataFilePath, JSON.stringify(updatedProducts), (error) => {
          console.log(error);
        });

        // issues with the code below:
        Cart.deleteProductFromCart(product.id, product.price);
      }
    });
  }
}; */

// create a product model using sequelize package
const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

// define the product model:
const Product = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
