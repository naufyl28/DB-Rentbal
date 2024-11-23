const express = require("express");
const router = express.Router();
const {
  tambahLaporan,
  getAllLaporan,
  generateLaporanKeuangan,
} = require("../controllers/laporanController");

// Route untuk menambah laporan keuangan
router.post("/", tambahLaporan);

// Route untuk mendapatkan semua laporan
router.get("/", getAllLaporan);

// Route untuk menghasilkan laporan keuangan otomatis
router.post("/generate", generateLaporanKeuangan);

module.exports = router;
