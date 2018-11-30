const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: false,
      select: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      unique: false,
      select: true
    },
    orders: {
      type: Number,
      required: [true, "Price is required"],
      unique: false,
      select: true,
      default: 0
    },
    img: {
      type: String,
      required: [true, "Image URL is required"],
      unique: false,
      select: true
    }
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
