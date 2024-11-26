const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // For JWT-based authentication

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.WEBSITE_DOMAIN || "https://purple-mern-ecommerce-website.vercel.app/",
  allowedHeaders: ["content-type", "Authorization"], // Allow Authorization header for JWT
  credentials: true,
}));
app.use(express.json()); // Parse incoming JSON data

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded; // Attach decoded user info to request object
    next();
  });
};

// Use Routes
app.use("/api/admins", verifyToken, adminRoutes); // Admin routes (protected)
app.use("/api/users", verifyToken, userRoutes);   // User routes (protected)
app.use("/api/products", productRoutes);         // Product routes (public)
app.use("/api/auth", authRoutes);                // Authentication routes (public)

// Root Route to check API status
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
