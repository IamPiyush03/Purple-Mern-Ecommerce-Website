// models/User.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store plain text password
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);