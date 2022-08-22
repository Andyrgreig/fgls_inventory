const express = require("express");
const product = require("../controllers/productControllers");

const router = express.Router();

// GET all products
router.get("/index", product.getAllProducts);

// GET single prodict
//router.route("/item/:id").get(product.getProduct);

// GET new product form
router.get("/add", product.getProductForm);

//POST new product to database
router.post("/add", product.createProduct);

//GET product details page
router.get("/:id", product.getProduct);

//GET update product form
router.get("/:id/update", product.getEditProductForm);

//POST updated product details
router.post("/:id/update", product.updateProduct);

//GET delete product page
router.get("/:id/delete", product.getDeleteProductForm);

//DELETE product
router.post("/:id/delete", product.deleteProduct);

module.exports = router;
