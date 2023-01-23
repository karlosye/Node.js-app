const { privateDecrypt } = require("crypto");
const fs = require("fs");
const path = require("path");

// get the data file path:
const cartDataFilePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

// create a cart object:
module.exports = class Cart {
  // add a static method: add to cart
  static addToCart(id, price) {
    // fetch cart from JSON
    fs.readFile(cartDataFilePath, (err, fileContent) => {
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
      fs.writeFile(cartDataFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProductFromCart(id, productPrice) {
    fs.readFile(cartDataFilePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };

      const matchProductIndex = updatedCart.products.findIndex((item) => {
        return item.id === id;
      });

      // update the price:
      updatedCart.totalPrice =
        updatedCart.totalPrice -
        updatedCart.products[matchProductIndex].qty * parseFloat(productPrice);
      // update the product array:
      // updatedCart.products = updatedCart.products.splice(matchProductIndex, 1);
      updatedCart.products = updatedCart.products.filter((item) => {
        return item.id !== id;
      });

      fs.writeFile(cartDataFilePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCartItems() {
    // read all data from cart:
    const fileContentCart = fs.readFileSync(cartDataFilePath);
    const cartData = JSON.parse(fileContentCart);
    return cartData;
  }
};
