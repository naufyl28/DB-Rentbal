const express = require("express");
const router = express.Router();
const {
  tambahCustomer,
  getAllCustomer,
} = require("../controllers/customerController"); // Pastikan sudah mengimpor dengan benar

// Route untuk menambah customer
router.post("/", tambahCustomer);

// Route untuk mendapatkan semua customer
router.get("/", getAllCustomer);

module.exports = router;
