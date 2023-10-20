const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

// Clave secreta para firmar y verificar tokens
const secretKey = "mi_clave_secreta";
// Tiempo de expiración del token (ejemplo: 1 hora)
const tokenExpiration = "3d";

// Función para generar un token JWT
function generateToken(data) {
  return jwt.sign(data, secretKey, { expiresIn: tokenExpiration });
}

// Middleware para verificar tokens en rutas protegidas
const jwtCheck = expressjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

module.exports = {
  generateToken,
  jwtCheck,
};
