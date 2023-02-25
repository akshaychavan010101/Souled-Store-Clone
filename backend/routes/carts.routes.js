const express = require("express");
const jwt = require("jsonwebtoken");
const CartRouter = express.Router();
CartRouter.use(express.json());
const { CartModel } = require("../models/cart.model");

CartRouter.get("/user/cartdata", async (req, res) => {
  const userid = req.body.userid;
  try {
    const usersCart = await CartModel.find({ userid: userid });
    res.send({ msg: "Users Cart data", data: usersCart });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

CartRouter.post("/user/addtocart", async (req, res) => {
  const payload = req.body;
  const product_id = req.body.product_id;
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.secretkey, async (err, decoded) => {
      if (decoded) {
        const product = await CartModel.find({ product_id: product_id });
        if (product.length > 0) {
          return res.send({ msg: "Product Already Added to the Cart" });
        } else {
          payload["userid"] = decoded.userid;
          const newProductTocart = await CartModel(payload).save();
          res.send({ msg: "Product Added to the Cart" });
        }
      } else {
        res.send({ msg: "You are not Logged in", Error: err.message });
      }
    });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

CartRouter.get("/user/getcart", async (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.secretkey, async (err, decoded) => {
      if (decoded) {
        const product = await CartModel.find({ userid: decoded.userid });
        return res.send({ data: product });
      } else {
        return res.send({ msg: "You are Not Logged in", Error: err.message });
      }
    });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

CartRouter.delete("/user/remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await CartModel.findByIdAndDelete({ _id: id });
    return res.send({ msg: "Product Removed" });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

//

module.exports = { CartRouter };
