// models/Product.js
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL or path to the image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
