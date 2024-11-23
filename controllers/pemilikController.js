const db = require("../db/connection");

// Tambah Pemilik menggunakan prosedur `addPemilik`
const tambahPemilik = async (req, res) => {
  const { Nama, Email, Password, No_Telepon } = req.body;
  try {
    const [result] = await db.query("CALL addPemilik(?, ?, ?, ?)", [
      Nama,
      Email,
      Password,
      No_Telepon,
    ]);

    // Mengambil `insertId` dari hasil prosedur
    const insertId = result[0][0].insertId;
    res.json({ id: insertId, Nama, Email, No_Telepon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menambahkan pemilik lapangan" });
  }
};

// Get Semua Pemilik menggunakan prosedur `getAllPemilik`
const getAllPemilik = async (req, res) => {
  try {
    const [rows] = await db.query("CALL getAllPemilik()");
    res.json(rows[0]); // Mengembalikan hasil query dari prosedur
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mendapatkan data pemilik lapangan" });
  }
};

const getPemilikById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("CALL getPemilikById(?)", [id]);
    console.log(rows); // Add this to check what you get from the query

    if (rows[0] && rows[0].length > 0) {
      res.json(rows[0][0]); // Send the first result
    } else {
      res.status(404).json({ error: "Pemilik tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Gagal mendapatkan data pemilik lapangan berdasarkan ID",
    });
  }
};

module.exports = {
  tambahPemilik,
  getAllPemilik,
  getPemilikById,
};
