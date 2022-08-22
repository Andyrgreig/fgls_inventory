const Category = require("../models/category");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.status(200).render("index", {
        title: "Browse Categories",
        list_items: categories,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategory = (req, res, next) => {
  Product.find({ category: req.params.id })
    .populate("category")
    .sort({ name: 1 })
    .exec(function (err, products) {
      if (err) {
        return next(err);
      }
      res.status(200).render("products", {
        title: products[0].category.name,
        list_items: products,
      });
    });
};

exports.createCategory = [
  // Validate and sanitise the name field.
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitisation.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category(req.body);

    // There are errors. Render the form again with sanitized values/error messages.
    if (!errors.isEmpty()) {
      res.render("categoryCreate", {
        title: "Add Category",
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }
        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to genre detail page.
            res.redirect("/");
          });
        }
      });
    }
  },
];

exports.deleteCategory = (req, res, next) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", id);
    }
    res.redirect("/");
  });
};

exports.newCategoryForm = (req, res, next) => {
  res.status(200).render("categoryCreate", {
    title: "Add Category",
  });
};

exports.getEditCategoryForm = (req, res, next) => {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    res.status(200).render("categoryUpdate", {
      title: "Update Category",
      item: category,
    });
  });
};

exports.getDeleteCategoryForm = (req, res, next) => {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    res.status(200).render("categoryDelete", {
      title: "Delete Category",
      item: category,
    });
  });
};

exports.updateCategory = [
  // Validate and sanitise the name field.
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  body("password", "Please enter the admin password")
    .trim()
    .equals("admin")
    .escape(),

  // Process request after validation and sanitisation.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body);
    const updates = {
      name: req.body.name,
      image: req.body.imageUrl,
      url: `/category/${req.params.id}`,
    };

    // If there are errors. Render the form again with sanitized values/error messages.
    if (!errors.isEmpty()) {
      res.render("categoryUpdate", {
        title: "Update Category",
        item: updates,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      Category.findByIdAndUpdate(req.params.id, updates)
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  //
];
