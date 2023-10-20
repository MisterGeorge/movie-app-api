const express = require("express");
const app     = express();
const authenticationErrorMiddleware = require("./src/middleware/authenticationError");

require("./src/config/db");

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Rutas principales
const mainRoutes = require("./src/routes");
app.use("/api", mainRoutes);
app.use(authenticationErrorMiddleware);

const port = process.env.PORT || 3001

app.listen(port, function () {
  console.log('#---------------------------');
  console.log('# Servidor API en ejecución');
  console.log('#---------------------------');
  console.log(' ');
});

module.exports = app;