const mongoose = require("mongoose");
const Product = require("../models/product");

module.exports = {
  list,
  create,
  remove,
  update
};

function list() {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find()
        .sort("title")
        .exec();
      resolve(products || []);
    } catch (err) {
      console.log("err:", "Failed to get products");
      reject(err);
    }
  });
}

function create(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const missing = ["title", "price", "img"].filter(
        prop => !(prop in payload)
      );
      if (missing.length) {
        return reject({ missing: missing });
      }
      const newProduct = new Product(payload);

      const savedProduct = await newProduct.save({ new: true });
      resolve(savedProduct);
    } catch (err) {
      reject(err);
    }
  });
}

function remove(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const removedProduct = await Product.findByIdAndRemove(id).exec();
      resolve(removedProduct);
    } catch (err) {
      reject(err);
    }
  });
}
function update(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        { $inc: { orders: 1 } }
      ).exec();
      resolve();
    } catch (err) {
      console.log("err:", err);
      reject(err);
    }
  });
}
