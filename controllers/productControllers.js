const async = require("async");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .populate("category")
    .sort({ name: 1 })
    .exec(function (err, products) {
      if (err) {
        return next(err);
      }
      res.status(200).render("products", {
        title: "All Products",
        list_items: products,
      });
    });
};

exports.createProduct = [
  // Validate and sanitize input fields.
  body("name", "Product name is required.").trim().notEmpty().escape(),
  body("description").trim().escape(),
  body("price", "Please specify product price").trim().notEmpty().escape(),
  body("stock", "Please specify stock level").trim().notEmpty().escape(),

  // Process request after validation and sanitisation.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    Category.find()
      .exec()

      //Create a product object with sanitised data
      .then(function (categories) {
        const searchIndex = categories.findIndex(
          (cat) => cat.name == req.body.category
        );
        const id = categories[searchIndex].id;
        const product = new Product({
          name: req.body.name,
          description: req.body.description,
          category: id,
          price: req.body.price,
          stock: req.body.stock,
          image: req.body.image,
        });

        // If there are errors. Render the form again with sanitized values/error messages.
        if (!errors.isEmpty()) {
          res.render("productCreate", {
            title: "Add Product",
            item: product,
            categories: categories,
            errors: errors.array(),
          });
          return;
        } else {
          // Data from form is valid.
          product.save(function (err) {
            if (err) {
              return next(err);
            } else {
              //Product saved. Redirect to home page.
              res.redirect("/product/index");
            }
          });
        }
      });
  },
];

exports.getProductForm = (req, res, next) => {
  Category.find().exec(function (err, categories) {
    if (err) {
      return next(err);
    }
    const item = {
      name: "",
      description: "",
      categories: "",
      price: "",
      stock: "",
      image: "",
    };
    res.status(200).render("productCreate", {
      title: "Add Product",
      item: item,
      categories: categories,
    });
  });
};

exports.getEditProductForm = (req, res, next) => {
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate("category").exec(callback);
      },
      category(callback) {
        Category.find().exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.status(200).render("productUpdate", {
        title: "Update Product",
        item: results.product,
        url: results.product.url,
        categories: results.category,
      });
    }
  );
};

exports.updateProduct = [
  // Validate and sanitize input fields.
  body("name", "Product name is required.").trim().notEmpty().escape(),
  body("description").trim().escape(),
  body("price", "Please specify product price").trim().notEmpty().escape(),
  body("stock", "Please specify stock level").trim().notEmpty().escape(),
  body("password", "Please enter the admin password")
    .trim()
    .equals("admin")
    .escape(),

  // Process request after validation and sanitisation.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    Category.find()
      .exec()

      .then(function (categories) {
        const searchIndex = categories.findIndex(
          (cat) => cat.name == req.body.category
        );
        const id = categories[searchIndex].id;

        const url = `/product/${req.params.id}`;

        const updates = {
          name: req.body.name,
          description: req.body.description,
          category: id,
          price: req.body.price,
          stock: req.body.stock,
          image: req.body.imageUrl,
          url: url,
        };

        // If there are errors. Render the form again with sanitized values/error messages.
        if (!errors.isEmpty()) {
          res.render("productUpdate", {
            title: "Add Product",
            item: updates,
            categories: categories,
            errors: errors.array(),
          });
          return;
        } else {
          // Data from form is valid.
          Product.findByIdAndUpdate(req.params.id, updates)
            .then(() => {
              res.redirect(url);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  },
];

exports.getDeleteProductForm = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("category")
    .exec(function (err, product) {
      if (err) {
        return next(err);
      }
      res.status(200).render("productDelete", {
        item: product,
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", id);
    }
    res.redirect("/product/index");
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("category")
    .exec(function (err, product) {
      if (err) {
        return next(err);
      }
      res.status(200).render("productDetail", {
        item: product,
      });
    });
};
