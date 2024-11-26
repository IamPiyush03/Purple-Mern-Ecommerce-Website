const express = require("express");
const { getAdmins, createAdmin } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getAdmins); // GET /api/admins
router.post("/", createAdmin); // POST /api/admins


module.exports = router;
