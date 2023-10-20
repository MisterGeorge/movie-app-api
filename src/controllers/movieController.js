const Movie = require("../models/peliculaModel");
const Review = require("../models/resenaModel");

exports.moviesWithAVG = async (req, res) => {
  try {
    const peliculasConPromedio = await Movie.aggregate([
      {
        $lookup: {
          from: "Resena",
          localField: "_id",
          foreignField: "peliculaId",
          as: "resena",
        },
      },
      {
        $unwind: {
          path: "$resena",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          nombre: { $first: "$nombre" },
          imagen: { $first: "$imagen" },
          descripcion: { $first: "$descripcion" },
          ratingAvg: {
            $avg: {
              $ifNull: ["$resena.calificacion", 0],
            },
          },
        },
      },
    ]);
    res.json(peliculasConPromedio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.movieWithReview = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId).exec();
    if (!movie) {
      return res
        .status(404)
        .json({ error: "No se encontró la película con el ID proporcionado" });
    }

    const reviews = await Review.find({ peliculaId: movie._id }).exec();

    const movieReviews = {
      ...movie._doc,
      reviews,
    };

    return res.json(movieReviews);
  } catch (err) {
    return res.status(500).json({ error: "Error en la solicitud" });
  }
};

exports.saveMovie = async (req, res) => {
  try {
    const nuevaPelicula = new Movie({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
    });

    const peliculaGuardada = await nuevaPelicula.save();
    res.status(201).json(peliculaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveReview = async (req, res) => {
  const peliculaId = req.params.id;

  try {
    const nuevaReview = new Review({
      peliculaId: peliculaId,
      calificacion: req.body.calificacion,
      comentario: req.body.comentario,
    });

    const reviewSaved = await nuevaReview.save();
    res.status(201).json(reviewSaved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
