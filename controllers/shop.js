const Product = require("../models/product");
const Cart = require("../models/cart");

// get request: shop(index) page
module.exports.getIndex = (req, res, next) => {
  // make a query to database
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get request: customer products page
module.exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get request: find product detail
module.exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  Product.findAll({ id: productId })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product[0],
        path: "/products",
        pageTitle: product[0].title,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // const cartData = Cart.fetchCartItems();
  // //console.log(cartData);
  // Product.fetchAll((productsData) => {
  //   const cartProducts = [];
  //   for (let product of productsData) {
  //     const cartProductData = cartData.products.find((prod) => {
  //       return prod.id === product.id;
  //     });
  //     if (cartProductData) {
  //       cartProducts.push({ productData: product, qty: cartProductData.qty });
  //     }
  //   }

  //   res.render("shop/cart", {
  //     pageTitle: "Your Cart",
  //     path: "/cart",
  //     products: cartProducts,
  //   });
  // });
};

module.exports.postItemToCart = async (req, res, next) => {
  const productId = req.body.productId;
  console.log(req.body.productId);

  const findProduct = await Product.findById(productId);
  const productPrice = parseFloat(findProduct.price);

  Cart.addToCart(productId, productPrice);

  res.redirect("/cart");
};

module.exports.postItemCartDelete = (req, res, next) => {
  const productId = req.body.itemId;
  const productPrice = req.body.itemPrice;

  console.log(productId);
  console.log(productPrice);

  Cart.deleteProductFromCart(productId, productPrice);

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
