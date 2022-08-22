const express = require("express");
const category = require("../controllers/categoryControllers");

const router = express.Router();

// GET home page, which shows a list of all categories
router.get("/", category.getCategories);

// GET new category form
router.get("/category/add", category.newCategoryForm);

// POST new category to database
router.post("/category/add", category.createCategory);

//GET update category form
router.get("/category/:id/update", category.getEditCategoryForm);

//POST updated category details
router.post("/category/:id/update", category.updateCategory);

// GET all products for a category
router.get("/category/:id", category.getProductsByCategory);

// GET delete category form
router.get("/category/:id/delete", category.getDeleteCategoryForm);

// DELETE category
router.post("/category/:id/delete", category.deleteCategory);

//router.delete("/category/:id/delete", category.deleteCategory);

module.exports = router;
