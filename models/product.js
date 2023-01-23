const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

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
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    // check if this product already exist:
    if (!this.id) {
      this.id = Math.random().toString();

      fs.readFile(dataFilePath, (err, fileContent) => {
        let products = [];
        if (!err) {
          products = JSON.parse(fileContent);
          console.log(products);
        }
        products.push(this);

        fs.writeFile(dataFilePath, JSON.stringify(products), (error) => {
          console.log(error);
        });
      });
    } else {
      // find the item from the product array:
      fs.readFile(dataFilePath, (err, fileContent) => {
        let products = [];
        if (!err) {
          products = JSON.parse(fileContent);
          const matchProductIndex = products.findIndex((item) => {
            return item.id === this.id;
          });
          // update the array item:
          products[matchProductIndex] = this;
          fs.writeFile(dataFilePath, JSON.stringify(products), (error) => {
            console.log(error);
          });
        }
      });
    }
  }

  static fetchAll(callback) {
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(dataFilePath, (error, data) => {
      if (error) {
        callback([]);
      }
      callback(JSON.parse(data));
    });

    // const data = fs.readFileSync(dataFilePath);
    // return JSON.parse(data);
  }

  static async findById(id) {
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    const readFileAsync = promisify(fs.readFile);

    try {
      const products = JSON.parse(await readFileAsync(dataFilePath));
      const product = products.find((item) => {
        return item.id == id;
      });

      return product;
    } catch (error) {
      return {};
    }
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
};
