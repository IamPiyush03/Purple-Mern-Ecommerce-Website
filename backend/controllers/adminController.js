const Admin = require("../models/Admin");

// Get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new admin
const createAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const admin = new Admin({ fullName, email, password ,isAdmin:true});
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAdmins, createAdmin };
