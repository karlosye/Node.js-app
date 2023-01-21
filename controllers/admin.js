const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();
  res.redirect("/");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/view-product-admin", {
      prods: products,
      pageTitle: "Admin product",
      path: "/admin/add-product",
    });
  });
};
