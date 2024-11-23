const db = require("../db/connection");

// Tambah Laporan Keuangan
const tambahLaporan = async (req, res) => {
  const { ID_Pemilik, Total_Keuntungan, Tanggal_Laporan } = req.body;
  console.log(req.body); // Tambahkan log ini untuk melihat data yang diterima
  try {
    const [result] = await db.query(
      "INSERT INTO Laporan_Keuangan (ID_Pemilik, Total_Keuntungan, Tanggal_Laporan) VALUES (?, ?, ?)",
      [ID_Pemilik, Total_Keuntungan, Tanggal_Laporan]
    );
    res.json({ id: result.insertId, Total_Keuntungan, Tanggal_Laporan });
  } catch (error) {
    console.error(error); // Log error ke console untuk debugging
    res.status(500).json({ error: "Gagal menambahkan laporan keuangan" });
  }
};

// Get Semua Laporan
const getAllLaporan = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Laporan_Keuangan");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan laporan keuangan" });
  }
};

const generateLaporanKeuangan = async (req, res) => {
  console.log("generateLaporanKeuangan called"); // Log saat fungsi dipanggil
  console.log("Request Body:", req.body); // Log data yang diterima

  const { ID_Pemilik } = req.body;

  if (!ID_Pemilik) {
    return res.status(400).json({ error: "ID Pemilik harus disertakan." });
  }

  try {
    // Memanggil stored procedure
    await db.query("CALL LaporanKeuanganOtomatis(?)", [ID_Pemilik]);
    res.json({ message: "Laporan keuangan berhasil dibuat." });
  } catch (error) {
    console.error("Stored Procedure Error:", error); // Log kesalahan dari stored procedure
    res.status(500).json({ error: "Gagal membuat laporan keuangan." });
  }
};

module.exports = {
  tambahLaporan,
  getAllLaporan,
  generateLaporanKeuangan, 
};
