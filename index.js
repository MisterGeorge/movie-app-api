const config  = require('./src/config/config');
const express = require("express");
const app     = express();
const authenticationErrorMiddleware = require("./src/middleware/authenticationError");

// DB Config
const { dbConnection } = require('./src/config/dbConnection');
dbConnection();

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Rutas principales
const mainRoutes = require("./src/routes");
app.use("/api", mainRoutes);
app.use(authenticationErrorMiddleware);

app.listen(config.PORT, function () {
  console.log('#---------------------------');
  console.log('# Servidor API en ejecución');
  console.log('#---------------------------');
  console.log(' ');
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
  console.log(' ');
});

module.exports = app;