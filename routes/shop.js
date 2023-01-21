const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminRoute = require("./admin");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

router.post("/add-to-cart", (req, res, next) => {
  console.log("add to cart...");
});

module.exports = router;
