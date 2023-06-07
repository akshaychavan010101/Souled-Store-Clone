const express = require("express");
const CartRouter = express.Router();
require("dotenv").config();

const { CartModel } = require("../models/cart.model");
const { authenticator } = require("../middlewares/authenticator.middleware");

CartRouter.get("/user/getcart", authenticator, async (req, res) => {
  const token = req.headers.authorization;
  try {
    const product = await CartModel.find({ userid: req.userid });
    return res.json({ data: product });
  } catch (error) {
    res.json({ msg: "Error", Error: error.message });
  }
});

CartRouter.post("/user/addtocart", authenticator, async (req, res) => {
  let payload = req.body;
  const product_id = req.body.product_id;
  try {
    const product = await CartModel.findOne({ product_id });
    if (product) {
      return res.json({ msg: "Product Already Added to Cart" });
    }
    payload["userid"] = req.userid;
    const newproduct = await CartModel(payload);
    newproduct.save();
    return res.json({ msg: "Product Added to Cart Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error", Error: error.message });
  }
});

CartRouter.delete("/user/remove/:id", authenticator, async (req, res) => {
  try {
    const id = req.params.id;
    await CartModel.findByIdAndDelete({ _id: id });
    return res.json({ msg: "Product Removed" });
  } catch (error) {
    res.json({ msg: "Error", Error: error.message });
  }
});

module.exports = { CartRouter };
