const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userid: { type: String, required: true },
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  gender: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  rating: { type: String, required: true },
  category: { type: String, required: true },
  theme: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: [String], required: true },
  Qty: { type: Number, required: true },
  afterQtyprice: { type: Number, required: true }
});

const CartModel = mongoose.model("cartproduct", cartSchema);

module.exports = { CartModel };
