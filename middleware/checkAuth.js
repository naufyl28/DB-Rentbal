const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak disediakan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }

    req.user = user; // Simpan data pengguna ke request object
    next();
  });
};

module.exports = checkAuth;
