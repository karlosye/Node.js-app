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
  const editMode = req.query.edit;
  const productId = req.params.productId;

  req.user
    .getProducts({ where: { id: productId } })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        edit: editMode === "true" ? true : false,
        product: product[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.deleteProduct = (req, res, next) => {
  // console.log(req.body.productId);
  const productId = req.body.productId;
  Product.destroy({ where: { id: productId } }).then((response) => {
    res.redirect("/admin/products");
  });
};

module.exports.postEditProduct = (req, res, next) => {
  // console.log(req.body);
  const productId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;

  Product.update(
    {
      title: title,
      price: price,
      description: description,
      imageURL: imageURL,
    },
    { where: { id: productId } }
  )
    .then((response) => {
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageURL = req.body.imageURL;

  // asosciate the product to a user:
  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageURL: imageURL,
    })
    .then((response) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// get request: show a list of products
module.exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/view-product-admin", {
        prods: products,
        pageTitle: "Admin product",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
