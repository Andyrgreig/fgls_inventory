//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
});

// Virtual for item's URL
CategorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

// Compile model from schema
module.exports = mongoose.model("Category", CategorySchema);
