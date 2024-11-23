const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/connection");

const loginCustomer = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  try {
    // Mengambil data customer berdasarkan email
    const [rows] = await db.query("SELECT * FROM customer WHERE Email = ?", [
      Email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    const customer = rows[0];

    // Membandingkan password yang dimasukkan dengan hash password yang ada di database
    const passwordMatch = await bcrypt.compare(Password, customer.Password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Membuat JWT token
    const token = jwt.sign(
      { id: customer.ID_Customer, email: customer.Email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({ message: "Login sukses", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = { loginCustomer };
