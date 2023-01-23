const Product = require("../models/product");
const Cart = require("../models/cart");

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// customer shop routes
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

module.exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((data) => {
      res.render("shop/product-detail", {
        product: data[0][0],
        pageTitle: "Product detail",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
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
