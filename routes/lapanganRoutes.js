const express = require("express");
const router = express.Router();
const {
  tambahLapangan,
  getAllLapangan,
} = require("../controllers/lapanganController");

// Route untuk menambah lapangan
router.post("/", tambahLapangan);

// Route untuk mendapatkan semua lapangan
router.get("/", getAllLapangan);

module.exports = router;
