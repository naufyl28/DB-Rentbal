require("dotenv").config();
const mysql = require("mysql2/promise");

// Membuat koneksi
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306, // Pastikan port sesuai dengan yang digunakan
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Berhasil terhubung ke database!");
    connection.release(); // Jangan lupa untuk melepaskan koneksi
  } catch (error) {
    console.error("Gagal terhubung ke database:", error.message);
  }
}

testConnection();
