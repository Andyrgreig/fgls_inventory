//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: Number,
  stock: Number,
  image: String,
});

// Virtual for item's URL
ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});

// Compile model from schema
module.exports = mongoose.model("Product", ProductSchema);
