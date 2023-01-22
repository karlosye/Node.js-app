const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageURL = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

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
        return item.id === id;
      });

      return product;
    } catch (error) {
      return {};
    }
  }
};
