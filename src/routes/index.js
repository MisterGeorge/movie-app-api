const express = require("express");
const router = express.Router();
const {
  moviesWithAVG,
  movieWithReview,
  saveReview,
  saveMovie,
} = require("../controllers/movieController");
const { jwtCheck, generateToken } = require("../middleware/auth");
const {
  validateReview,
  validateMovie,
} = require("../middleware/validateRequest");

// Definir rutas
router.get("/movies", jwtCheck, moviesWithAVG);
router.get("/movies/:id", jwtCheck, movieWithReview);
router.post("/movies/:id/reviews", jwtCheck, validateReview, saveReview);
router.post("/movies", jwtCheck, validateMovie, saveMovie);

router.get("/get-token", (req, res) => {
  const token = generateToken({ userId: "movie_user" });
  return res.status(200).json({ token });
});

module.exports = router;
