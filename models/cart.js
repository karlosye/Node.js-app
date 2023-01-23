const { privateDecrypt } = require("crypto");
const fs = require("fs");
const path = require("path");

// get the data file path:
const dataFilePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

// create a cart object:
module.exports = class Cart {
  // add a static method: add to cart
  static addToCart(id, price) {
    // fetch cart from JSON
    fs.readFile(dataFilePath, (err, fileContent) => {
      // format: [{id:,qty:}]
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // find the exisiting product:
      const existingProductIndex = cart.products.findIndex((item) => {
        return item.id === id;
      });

      // if existingProduct exist:
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products.push({ id, qty: 1 });
      }

      cart.totalPrice += price;

      // write file:
      fs.writeFile(dataFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(dataFilePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...fileContent };

      console.log(updatedCart);
      console.log(updatedCart.products);

      const matchProductIndex = updatedCart.products.findIndex((item) => {
        return item.id === id;
      });

      // update the price:
      updatedCart.totalPrice =
        updatedCart.totalPrice -
        updatedCart.products[matchProductIndex].qty * parseFloat(productPrice);
      // update the product array:
      updatedCart.products = updatedCart.products.splice(matchProductIndex, 1);

      fs.writeFile(dataFilePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
