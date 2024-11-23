const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/connection"); // Pastikan path sesuai dengan lokasi file koneksi database

// Fungsi untuk menambah customer dengan hashing password
const tambahCustomer = async (req, res) => {
  const { Nama, Email, Password, No_Telepon } = req.body;

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Menyimpan customer dengan password yang sudah di-hash
    const [result] = await db.query("CALL addCustomer(?, ?, ?, ?)", [
      Nama,
      Email,
      hashedPassword, // Password hashed
      No_Telepon,
    ]);

    const insertId = result[0].insertId;
    res.json({
      message: "Customer berhasil ditambahkan",
      customer: { id: insertId, Nama, Email, No_Telepon },
    });
  } catch (error) {
    console.error("Error saat menambahkan customer:", error);
    res.status(500).json({
      error: "Gagal menambahkan customer",
      detail: error.message,
    });
  }
};

// Fungsi untuk mendapatkan semua customer
const getAllCustomer = async (req, res) => {
  try {
    const [customers] = await db.query("SELECT * FROM customer");
    res.json(customers);
  } catch (error) {
    console.error("Error saat mengambil semua customer:", error);
    res.status(500).json({
      error: "Gagal mengambil data customer",
      detail: error.message,
    });
  }
};

// Fungsi untuk login customer
const loginCustomer = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    console.log("Menerima request login untuk email:", Email); // Log email yang diterima

    // Memanggil prosedur LoginCustomer
    const [result] = await db.query("CALL LoginCustomer(?)", [Email]);

    // Jika email tidak ditemukan
    if (
      !result ||
      result.length === 0 ||
      result[0].Status === "Email tidak ditemukan"
    ) {
      console.log("Email tidak ditemukan:", Email); // Log email yang tidak ditemukan
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    // Ambil data dari hasil prosedur
    const { ID_Customer, Nama, Password: hashedPassword } = result[0];

    // Log untuk data yang ditemukan
    console.log("Data customer ditemukan:", { ID_Customer, Nama, Email });

    // Verifikasi password
    const isMatch = await bcrypt.compare(Password, hashedPassword);

    console.log("Hasil perbandingan password:", isMatch); // Log hasil perbandingan password

    if (!isMatch) {
      console.log("Password tidak cocok"); // Log jika password tidak cocok
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Cek apakah JWT_SECRET tersedia di environment
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Log JWT_SECRET

    // Buat token JWT
    const token = jwt.sign(
      { id: ID_Customer, email: Email },
      process.env.JWT_SECRET, // Pastikan JWT_SECRET sudah di-set di .env
      { expiresIn: "1h" }
    );

    console.log("Token yang dibuat:", token); // Log token JWT

    res.json({
      message: "Login berhasil",
      token,
      user: { id: ID_Customer, name: Nama, email: Email },
    });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

// Fungsi untuk memperbarui data customer
const updateCustomer = async (req, res) => {
  const { ID_Customer, Nama, Email, No_Telepon } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE customer SET Nama = ?, Email = ?, No_Telepon = ? WHERE ID_Customer = ?",
      [Nama, Email, No_Telepon, ID_Customer]
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Customer berhasil diperbarui",
        customer: { ID_Customer, Nama, Email, No_Telepon },
      });
    } else {
      res.status(400).json({ message: "Gagal memperbarui customer" });
    }
  } catch (error) {
    console.error("Error saat memperbarui customer:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui data customer",
    });
  }
};

// Fungsi untuk menghapus customer
const deleteCustomer = async (req, res) => {
  const { ID_Customer } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM customer WHERE ID_Customer = ?",
      [ID_Customer]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Customer berhasil dihapus" });
    } else {
      res.status(400).json({ message: "Customer tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error saat menghapus customer:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus customer",
    });
  }
};

module.exports = {
  tambahCustomer,
  getAllCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
};
