const { Schema, model } = require('mongoose');

const PeliculaSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true,
  }
});

PeliculaSchema.method('toJSON', function () {
    const { __v, _id, nombre, ...object } = this.toObject();
    object.uuid = _id;
    return object;
})

module.exports = model('Pelicula', PeliculaSchema);