function authenticationErrorMiddleware(err, req, res, next) {
  if (err.status === 401) {
    res.status(401).json({ error: "Error de autenticación" });
  } else {
    next(err); // Pasa el error a otros middlewares de manejo de errores
  }
}
module.exports = authenticationErrorMiddleware;
