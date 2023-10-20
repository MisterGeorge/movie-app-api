const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  peliculaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  calificacion: { type: Number, min: 1, max: 5, required: true },
  comentario: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
