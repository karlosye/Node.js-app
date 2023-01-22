const Product = require("../models/product");

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

// customer shop routes
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

module.exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  const matchProduct = await Product.findById(productId);
  // console.log(matchProduct);
  res.render("shop/product-detail", {
    product: matchProduct,
    pageTitle: "Product detail",
    path: "/products",
  });
};

module.exports.getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Your Cart", path: "/cart" });
};

module.exports.postItemToCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(req.body.productId);
  res.redirect("/cart");
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "checkout page",
    path: "/checkout",
  });
};

module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "checkout page",
    path: "/checkout",
  });
};
