const express = require("express");
const router = express.Router();
const {
  tambahPemilik,
  getAllPemilik,
  getPemilikById, // Menambahkan handler untuk getPemilikById
} = require("../controllers/pemilikController");

// Rute untuk menambah pemilik
router.post("/", tambahPemilik);

// Rute untuk mendapatkan semua pemilik
router.get("/", getAllPemilik);

// Rute untuk mendapatkan pemilik berdasarkan ID
router.get("/:id", getPemilikById);

module.exports = router;
