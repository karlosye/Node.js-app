const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/edit-product => POST : POST request to handle edit product
router.post("/edit-product", adminController.postEditProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/delete-product => POST
router.post("/delete-product", adminController.deleteProduct);

exports.routes = router;
