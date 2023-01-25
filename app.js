const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const Product = require("./models/product");
const User = require("./models/user");

const app = express();

const sequelize = require("./util/database");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// register the req.user: this will only execute once when the server starts
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use("/admin", adminRoute.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  console.log(req.user.dataValues);
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
});

// define a relationship between a product and user
// 1-to-many: 1 user can have many products
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// define assication btw product, cart, cartItem & user
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// define association btw user - order - product
// user-order: 1-to-many ; order-product: many-to-many
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

// init the database:
sequelize
  .sync()
  .then((response) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Karlos", email: "karlos@123.com" });
    }
    return user;
  })
  .then((user) => {
    return user.getCart().then((cart) => {
      console.log("LETs CHECK CART BEFORE CREATING: " + cart);
      if (!cart) {
        console.log("USER AVAILABLE INSIDE a PROMISE: " + user.id);
        return user.createCart();
      }
      return cart;
    });
  })
  .then((cart) => {
    app.listen(3000, () => {
      console.log("server has started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
