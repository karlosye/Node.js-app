const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
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

  static fetchAll() {
    const dataFilePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(dataFilePath, (error, data) => {
      if (error) {
        return [];
      }
      return JSON.parse(data);
    });
  }
};
