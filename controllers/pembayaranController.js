const db = require("../db/connection");

// Tambah Pembayaran
const tambahPembayaran = async (req, res) => {
  const {
    ID_Reservasi,
    Metode_Pembayaran,
  } = req.body;

  try {
    // Mulai transaksi
    await db.query("START TRANSACTION");

    // Ambil total pembayaran dari tabel reservasi
    const [reservasi] = await db.query(
      "SELECT Total_Harga FROM reservasi WHERE ID_Reservasi = ?",
      [ID_Reservasi]
    );

    // Pastikan Total_Pembayaran tidak null
    if (!reservasi.length) {
      await db.query("ROLLBACK");
      return res.status(400).json({ error: "Total_Pembayaran tidak ditemukan untuk ID_Reservasi yang diberikan" });
    }

    const Total_Pembayaran = reservasi[0].Total_Harga;

    // Menambah pembayaran dengan tanggal otomatis
    const [result] = await db.query(
      "INSERT INTO pembayaran (ID_Reservasi, Tanggal_Pembayaran, Total_Pembayaran, Metode_Pembayaran) VALUES (?, CURDATE(), ?, ?)",
      [ID_Reservasi, Total_Pembayaran, Metode_Pembayaran]
    );

    // Update status pembayaran menjadi 'Lunas'
    await db.query("UPDATE reservasi SET Status_Pembayaran = 'Lunas' WHERE ID_Reservasi = ?", [ID_Reservasi]);

    // Simpan perubahan jika tidak ada masalah
    await db.query("COMMIT");

    res.json({ id: result.insertId, Total_Pembayaran, Metode_Pembayaran });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan pembayaran" });
  }
};

// Get Semua Pembayaran
const getAllPembayaran = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pembayaran");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan daftar pembayaran" });
  }
};

// Get Pembayaran Berdasarkan ID Pemilik
const getPembayaranByPemilikId = async (req, res) => {
  const { idPemilik } = req.params; // Ambil ID Pemilik dari parameter

  try {
    const [rows] = await db.query(`
      SELECT p.*
      FROM pembayaran p
      JOIN reservasi r ON p.ID_Reservasi = r.ID_Reservasi
      WHERE r.ID_Lapangan IN (
        SELECT ID_Lapangan
        FROM lapangan
        WHERE ID_Pemilik = ?
      )
    `, [idPemilik]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan pembayaran untuk pemilik yang diberikan" });
  }
};

module.exports = {
  tambahPembayaran,
  getAllPembayaran,
  getPembayaranByPemilikId,
};