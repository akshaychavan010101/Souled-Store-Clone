const express = require("express");
// const { authenticator } = require("../middlewares/authenticator.middleware");
const { ProductModel } = require("../models/products.model");
const ProductRouter = express.Router();
ProductRouter.use(express.json());

ProductRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json({ data: products, ok: true });
  } catch (error) {
    res.send({ msg: "Error**", Error: error.message });
  }
});

ProductRouter.get("/products/singleproduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById({ _id: id });
    res.send({ data: product, ok: true });
  } catch (error) {
    res.send({ msg: "Error**", Error: error.message });
  }
});

ProductRouter.get("/products/women", async (req, res) => {
  try {
    const products = await ProductModel.find({ gender: "Women" });
    const count = products.length;
    res.send({ data: products, count: count, ok: true });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Error**", Error: error });
  }
});

ProductRouter.get("/products/men", async (req, res) => {
  try {
    const products = await ProductModel.find({ gender: "Men" });
    const count = products.length;
    res.send({ data: products, count: count, ok: true });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

ProductRouter.get("/products/kids", async (req, res) => {
  try {
    const products = await ProductModel.find({ gender: "Kids" });
    const count = products.length;
    res.send({ data: products, count: count, ok: true });
  } catch (error) {
    res.send({ msg: "Error", Error: error.message });
  }
});

ProductRouter.post("/products/add", async (req, res) => {
  const payload = req.body;
  try {
    const newProduct = new ProductModel(payload);
    await newProduct.save();
    res.send({ msg: "Product Added Successfully", ok: true });
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
