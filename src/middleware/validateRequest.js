const Joi = require("joi");

// Middleware de validación con Joi
function validateReview(req, res, next) {
  // Define el esquema de validación con Joi
  const schema = Joi.object({
    calificacion: Joi.number().integer().min(1).max(5).required(),
    comentario: Joi.string().required(),
  });

  // Validar los datos en el cuerpo de la solicitud
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // Si los datos son válidos, continúa con el siguiente middleware o ruta
}

function validateMovie(req, res, next) {
  // Define el esquema de validación con Joi
  const schema = Joi.object({
    nombre: Joi.string().required(),
    imagen: Joi.string().uri().required(),
    descripcion: Joi.string().required(),
  });

  // Validar los datos en el cuerpo de la solicitud
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // Si los datos son válidos, continúa con el siguiente middleware o ruta
}

module.exports = { validateReview, validateMovie };
