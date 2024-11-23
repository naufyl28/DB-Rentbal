const db = require("../db/connection");

// Tambah Komentar
const tambahKomentar = async (req, res) => {
  const { ID_Customer, ID_Lapangan, Tanggal_Komentar, Komentar, Rating } =
    req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Komentar (ID_Customer, ID_Lapangan, Tanggal_Komentar, Komentar, Rating) VALUES (?, ?, ?, ?, ?)",
      [ID_Customer, ID_Lapangan, Tanggal_Komentar, Komentar, Rating]
    );
    res.json({ id: result.insertId, Komentar, Rating });
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan komentar" });
  }
};

// Get Semua Komentar
const getAllKomentar = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Komentar");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan daftar komentar" });
  }
};

module.exports = {
  tambahKomentar,
  getAllKomentar,
};