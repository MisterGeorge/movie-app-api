const { Schema, model } = require('mongoose');

const ResenaSchema = Schema({
  peliculaId: {
    type: Schema.Types.ObjectId,
    ref: "Pelicula",
    required: true,
  },
  clasificacion: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  comentario: {
    type: String,
    required: true,
  }
});

ResenaSchema.method('toJSON', function () {
  const { __v, _id, clasificacion, ...object } = this.toObject();
  object.uuid = _id;
  return object;
})

module.exports = model('Resena', ResenaSchema);