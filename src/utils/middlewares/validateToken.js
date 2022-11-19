const jwt = require("jsonwebtoken");
const TOKEN_KEY = "BVj543kpJ2POLN3PJPOl9nNNL84NL122A54";
require("dotenv").config();

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) throw new Error("Acceso denegado");
  try {
    const verified = jwt.verify(token, TOKEN_KEY);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "token no es válido" });
  }
};

module.exports = verifyToken;
