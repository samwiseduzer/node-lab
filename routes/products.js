const express = require("express");
const router = express.Router();
const product = require("../helpers/product");

// PRODUCT LIST
router.get("/", async function(req, res, next) {
  try {
    const products = await product.list();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PRODUCT CREATE
router.post("/", async function(req, res, next) {
  try {
    const newProduct = await product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PRODUCT REMOVE
router.delete("/:id", async function(req, res, next) {
  try {
    const removed = await product.remove(req.params.id);
    res.json({ message: "success", removed });
  } catch (err) {
    console.log("err:", err);
    res.status(400).json(err);
  }
});

// PRODUCT ORDER
router.put("/:id", async function(req, res, next) {
  try {
    await product.update(req.params.id);
    res.json({ message: "success" });
  } catch (err) {
    console.log("err:", err);
    res.status(400).json(err);
  }
});

module.exports = router;
