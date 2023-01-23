const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit: false,
  });
};

// edit a product controller
module.exports.getEditProduct = async (req, res, next) => {
  // grab the query parameter
  const editMode = req.query.edit;
  // console.log(editMode);
  // console.log(req.params.productId);

  const findProduct = await Product.findById(req.params.productId);

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    edit: editMode === "true" ? true : false,
    product: findProduct,
  });
};

module.exports.deleteProduct = (req, res, next) => {
  // console.log(req.body.productId);
  const productId = req.body.productId;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};

module.exports.postEditProduct = (req, res, next) => {
  // console.log(req.body);
  const productId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;

  const modifiedProduct = new Product(
    productId,
    title,
    imageURL,
    description,
    price
  );
  modifiedProduct.save();
  res.redirect("/admin/products");
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;
  const newProduct = new Product(null, title, imageURL, description, price);
  newProduct.save();
  res.redirect("/");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/view-product-admin", {
      prods: products,
      pageTitle: "Admin product",
      path: "/admin/products",
    });
  });
};
