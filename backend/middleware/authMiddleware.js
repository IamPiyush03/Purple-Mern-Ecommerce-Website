const jwt = require("jsonwebtoken");

// Protect middleware: Verifies the JWT and attaches user info to the request object
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use a secret key from your .env file
    req.user = decoded; // Attach the decoded user info to the req object
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

// Admin middleware: Checks if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized, admin access required" });
  }
};

module.exports = { protect, admin };
