const express = require("express");
const Product = require("../models/Product");
const mongoose = require("mongoose"); // Import mongoose

const { protect } = require("../middleware/authMiddleware"); // Ensure middleware is implemented correctly

const router = express.Router();

/**
 * Route to fetch all products with optional filters
 * @query category (string) - Filter products by category
 * @query priceMin (number) - Minimum price for filtering
 * @query priceMax (number) - Maximum price for filtering
 */
router.get("/", async (req, res) => {
  const { category, priceMin, priceMax } = req.query;

  let filter = {};

  if (category) filter.category = category;

  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin && !isNaN(priceMin)) filter.price.$gte = parseFloat(priceMin);
    if (priceMax && !isNaN(priceMax)) filter.price.$lte = parseFloat(priceMax);
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/**
 * Route to create a new product
 * Requires authentication (protect middleware)
 */
router.post("/", protect, async (req, res) => {
  const { name, price, category, stock, description, image } = req.body;

  // Validate required fields
  if (!name || !price || !category || !stock || !description || !image) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate price and stock
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number." });
  }

  if (isNaN(stock) || stock < 0) {
    return res.status(400).json({ message: "Stock must be a non-negative integer." });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      description,
      image,
      user: req.user._id, // Associate the product with the logged-in user
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ 
      message: "Product created successfully", 
      product: savedProduct 
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});

/**
 * Route to delete a product
 * Requires authentication (protect middleware)
 */
router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.user || product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


module.exports = router;
