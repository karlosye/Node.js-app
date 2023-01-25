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
};

module.exports.postItemToCart = async (req, res, next) => {
  const productId = req.body.productId;

  try {
    const cart = await req.user.getCart();
    const productsSequelize = await cart.getProducts({
      where: { id: productId },
    });

    const manageProductAndQty = async () => {
      // if there exist items in cart
      if (productsSequelize.length > 0) {
        const items = productsSequelize[0];
        const oldQuantity = items.cartItem.quantity;
        const quantity = oldQuantity + 1;

        return { items, quantity };
      } else {
        const items = await Product.findByPk(productId);
        return { items, quantity: 1 };
      }
    };

    const { items, quantity } = await manageProductAndQty();
    await cart.addProduct(items, { through: { quantity: quantity } });
    await res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }

  // const findProduct = await Product.findById(productId);
  // const productPrice = parseFloat(findProduct.price);

  // Cart.addToCart(productId, productPrice);

  // res.redirect("/cart");
};

// post request: delete an item from cart
module.exports.postItemCartDelete = async (req, res, next) => {
  const productId = req.body.itemId;
  // const productPrice = req.body.itemPrice;

  // Cart.deleteProductFromCart(productId, productPrice);

  // res.redirect("/cart");

  // delete the item from the in-between table:
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      return products[0].cartItem.destroy();
    })
    .then((response) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
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

module.exports.createOrder = (req,res,next) => {
  
}
