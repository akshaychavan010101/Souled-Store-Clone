const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  gender: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  rating: { type: String, required: true },
  property: { type: String, required: true },
  theme: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: [String], required: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
