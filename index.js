const express = require("express");
const checkAuth = require("./middleware/checkAuth"); // Pastikan untuk mengimpor middleware

// Rute-rute lainnya
const pemilikRoutes = require("./routes/pemilikRoutes");
const customerRoutes = require("./routes/customerRoutes");
const lapanganRoutes = require("./routes/lapanganRoutes");
const reservasiRoutes = require("./routes/reservasiRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");
const komentarRoutes = require("./routes/komentarRoutes");
const laporanRoutes = require("./routes/laporanRoutes");
const authRoutes = require("./routes/authRoutes"); // Untuk login

// Inisialisasi aplikasi
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute login (untuk mendapatkan token JWT)
app.use("/auth", authRoutes);

// Rute-rute dengan middleware otentikasi
app.use("/pemilik", pemilikRoutes);
app.use("/customer", customerRoutes);
// Hapus middleware checkAuth pada rute /customer jika itu adalah rute registrasi
app.use("/lapangan", checkAuth, lapanganRoutes);
app.use("/reservasi", checkAuth, reservasiRoutes);
app.use("/pembayaran", checkAuth, pembayaranRoutes);
app.use("/komentar", checkAuth, komentarRoutes);
app.use("/laporan", checkAuth, laporanRoutes);

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
