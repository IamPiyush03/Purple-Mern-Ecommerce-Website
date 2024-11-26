const express = require("express");
const { registerUser, loginUser, adminLogin } = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Admin login
router.post("/admin-login", adminLogin);

// Protected Routes
// Get user profile
router.get("/profile", protect, (req, res) => {
  res.json({
    userId: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

// Admin-only route
router.get("/admin-only", protect, admin, (req, res) => {
  res.json({ message: "This is an admin-only route." });
});

module.exports = router;
