const express = require("express");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { ProductModel } = require("../models/products.model");
const ProductRouter = express.Router();
ProductRouter.use(express.json());

ProductRouter.use(authenticator);
ProductRouter.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.send(products);
});

ProductRouter.get("/products/women", async (req, res) => {
  const products = await ProductModel.find({ gender: "Women" });
  const count = await ProductModel.find({ gender: "Women" }).count();
  res.send({ data: products, count: count });
});

ProductRouter.get("/products/men", async (req, res) => {
  const products = await ProductModel.find({ gender: "Men" });
  const count = await ProductModel.find({ gender: "Men" }).count();
  res.send({ data: products, count: count });
});

ProductRouter.get("/products/kids", async (req, res) => {
  const products = await ProductModel.find({ gender: "Kids" });
  const count = await ProductModel.find({ gender: "Kids" }).count();
  res.send({ data: products, count: count });
});

ProductRouter.post("/products/add", async (req, res) => {
  const payload = req.body;

  try {
    const newProduct = new ProductModel(payload);
    await newProduct.save();
    console.log(p);
    res.send({ msg: "Product added" });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

ProductRouter.patch("/products/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const products = await ProductModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    res.send({ msg: "Product updated" });
  } catch (error) {
    res.send({ msg: "Server error", Error: error.message });
  }
});

ProductRouter.delete("/products/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const products = await ProductModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Product deleted" });
  } catch (error) {
    res.send({ msg: "Server error", Error: error.message });
  }
});
module.exports = { ProductRouter };
