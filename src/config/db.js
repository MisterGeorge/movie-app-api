const mongoose = require("mongoose");

// URL de conexión a tu base de datos MongoDB
const mongoURI = process.env.URI || 'mongodb+srv://jarmandopacheco:k1Mx5P618JoSHySK@appmovies.baafcps.mongodb.net/?retryWrites=true&w=majority';

// Conectar a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB: "));
db.once("open", () => {
  console.log("Conexión a MongoDB exitosa");
});

module.exports = db;
