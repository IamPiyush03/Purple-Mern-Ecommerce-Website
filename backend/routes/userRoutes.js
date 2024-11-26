const express = require("express");
const User = require("../models/User"); // Assuming User model exists and is set up to interact with your DB

const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
  try {
    // Fetch all users but exclude the password field for security
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate that all required fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Store the password directly (NOT recommended for production)
    const user = await User.create({ fullName, email, password }); // Store plain text password

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
});

// Login route for user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored plain text password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token and send it to the client
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;