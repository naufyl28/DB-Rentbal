const express = require("express");
const router = express.Router();
const {
  tambahKomentar,
  getAllKomentar,
} = require("../controllers/komentarController");

// Route untuk menambah komentar
router.post("/", tambahKomentar);

// Route untuk mendapatkan semua komentar
router.get("/", getAllKomentar);

module.exports = router;
