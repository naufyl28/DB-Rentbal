const express = require("express");
const router = express.Router();
const {
  tambahReservasi,
  getAllReservasi,
} = require("../controllers/reservasiController");

// Route untuk menambah reservasi
router.post("/tambah", tambahReservasi);

// Route untuk mendapatkan semua reservasi
router.get("/all", getAllReservasi);

module.exports = router;
