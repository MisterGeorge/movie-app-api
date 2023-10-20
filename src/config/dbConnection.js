// Conexión a Base de datos
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}.baafcps.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log(`Conectado con la base de datos "${process.env.DB_NAME}"`))
      .catch(e => console.log('error db:', e));
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos')
  }
}

module.exports = { dbConnection };