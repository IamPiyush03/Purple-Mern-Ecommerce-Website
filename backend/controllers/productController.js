const mongoose = require("mongoose");
const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments();
    res.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  // Validate input
  if (!name || !price || !image) {
    return res.status(400).json({ message: "Name, price, and image are required." });
  }

  try {
    const product = new Product({ name, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getProducts, createProduct, deleteProduct };
