const express = require("express");
const router = express.Router();
const {
  tambahPembayaran,
  getAllPembayaran,
} = require("../controllers/pembayaranController");

// Route untuk menambah pembayaran
router.post("/", tambahPembayaran);

// Route untuk mendapatkan semua pembayaran
router.get("/", getAllPembayaran);

module.exports = router;
