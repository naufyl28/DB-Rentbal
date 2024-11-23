const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validasi sederhana (gantikan dengan validasi dari database)
  if (email === "user@example.com" && password === "password123") {
    // Buat token JWT
    const user = { id: 1, email: "user@example.com", role: "user" };
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return res.json({ message: "Login berhasil", token });
  }

  return res.status(401).json({ message: "Email atau password salah" });
});

module.exports = router;
