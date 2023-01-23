const Product = require("../models/product");
const Cart = require("../models/cart");

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
  const cartData = Cart.fetchCartItems();
  //console.log(cartData);
  Product.fetchAll((productsData) => {
    const cartProducts = [];
    for (let product of productsData) {
      const cartProductData = cartData.products.find((prod) => {
        return prod.id === product.id;
      });
      if (cartProductData) {
        cartProducts.push({ productData: product, qty: cartProductData.qty });
      }
    }

    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products: cartProducts,
    });
  });
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
