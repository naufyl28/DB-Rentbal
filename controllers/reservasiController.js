const db = require("../db/connection"); // Pastikan ini mengarah ke koneksi database yang benar

// Tambah Reservasi
const tambahReservasi = async (req, res) => {
  const {
    ID_Customer,
    ID_Lapangan,
    Jam_Mulai,
    Jam_Selesai,
    Tanggal_Reservasi,
  } = req.body;

  // Validasi input
  if (
    !ID_Customer ||
    !ID_Lapangan ||
    !Jam_Mulai ||
    !Jam_Selesai ||
    !Tanggal_Reservasi
  ) {
    return res.status(400).json({ error: "Semua field harus diisi." });
  }

  try {
    // Memanggil stored procedure addReservasi
    const [result] = await db.query("CALL addReservasi(?, ?, ?, ?, ?)", [
      Tanggal_Reservasi,
      Jam_Mulai,
      Jam_Selesai,
      ID_Lapangan,
      ID_Customer,
    ]);

    res.json({
      message: "Reservasi berhasil ditambahkan",
      id: result.insertId, // Menyesuaikan response sesuai hasil stored procedure
    });
  } catch (error) {
    console.error(error); // Log error ke console untuk debugging
    res.status(500).json({ error: "Gagal menambahkan reservasi" });
  }
};

// Get Semua Reservasi
const getAllReservasi = async (req, res) => {
  try {
    // Memanggil stored procedure getAllReservasi
    const [rows] = await db.query("CALL getAllReservasi()");
    res.json(rows[0]); // rows[0] digunakan karena MySQL mengembalikan hasil dalam bentuk array berisi array
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan daftar reservasi" });
  }
};

module.exports = {
  tambahReservasi,
  getAllReservasi,
};
