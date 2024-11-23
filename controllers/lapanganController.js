const db = require("../db/connection");

// Tambah Lapangan
const tambahLapangan = async (req, res) => {
  const { ID_Pemilik, Nama_Lapangan, Lokasi, Harga_Per_Jam, Status_Aktif } =
    req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO Lapangan (ID_Pemilik, Nama_Lapangan, Lokasi, Harga_Per_Jam, Status_Aktif) VALUES (?, ?, ?, ?, ?)",
      [ID_Pemilik, Nama_Lapangan, Lokasi, Harga_Per_Jam, Status_Aktif]
    );

    res.json({
      id: result.insertId,
      Nama_Lapangan,
      Lokasi,
      Harga_Per_Jam,
      Status_Aktif,
    });
  } catch (error) {
    console.error("Error adding lapangan:", error); // Tampilkan detail kesalahan
    res
      .status(500)
      .json({ error: "Gagal menambahkan lapangan", detail: error }); // Tampilkan detail kesalahan
  }
};

// Get Semua Lapangan
const getAllLapangan = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Lapangan");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan daftar lapangan" });
  }
};

module.exports = {
  tambahLapangan,
  getAllLapangan,
};