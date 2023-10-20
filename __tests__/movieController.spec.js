const request = require("supertest");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const app = require("../"); // Importa tu aplicación Express (index.js)

const Movie = require("../src/models/movieModel");
const Review = require("../src/models/reviewModel");

describe("Controladores", () => {
  const token = jwt.sign({ userId: "usuario_de_prueba" }, "mi_clave_secreta");

  afterEach(() => {
    sinon.restore();
  });

  it("debería guardar una película", async () => {
    const movieSaveStub = sinon.stub(Movie.prototype, "save");
    movieSaveStub.resolves({
      _id: "65315ddb2470b2aac956e607",
      nombre: "Película de prueba",
      imagen: "https://ejemplo.com/imagen.jpg",
      descripcion: "Esta es una película de prueba.",
    });

    const response = await request(app)
      .post("/api/movie")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nombre: "Película de prueba",
        imagen: "https://ejemplo.com/imagen.jpg",
        descripcion: "Esta es una película de prueba.",
      });

    expect(response.statusCode).toBe(201);

    movieSaveStub.restore();
  });

  it("debería guardar una reseña para una película", async () => {
    const reviewSaveStub = sinon.stub(Review.prototype, "save");
    reviewSaveStub.resolves({
      _id: "65315ddb2470b2aac956e60b",
      peliculaId: "65315ddb2470b2aac956e607",
      calificacion: 5,
      comentario: "Una reseña de prueba.",
    });

    const response = await request(app)
      .post("/api/movie/65315ddb2470b2aac956e607/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send({
        calificacion: 5,
        comentario: "Una reseña de prueba.",
      });

    expect(response.statusCode).toBe(201);

    reviewSaveStub.restore();
  });

  it("debería obtener una película con sus reseñas", async () => {
    const movieFindByIdStub = sinon.stub(Movie, "findById");
    movieFindByIdStub.resolves({
      _id: "65315ddb2470b2aac956e607",
      nombre: "Película de prueba",
      imagen: "https://ejemplo.com/imagen.jpg",
      descripcion: "Esta es una película de prueba.",
    });

    const reviewFindStub = sinon.stub(Review, "find");
    reviewFindStub.resolves([
      {
        _id: "65315ddb2470b2aac956e60b",
        peliculaId: "65315ddb2470b2aac956e607",
        calificacion: 5,
        comentario: "Una reseña de prueba.",
      },
    ]);

    const response = await request(app)
      .get("/api/movie/65315ddb2470b2aac956e607")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    movieFindByIdStub.restore();
    reviewFindStub.restore();
  });

  it("debería obtener películas con promedio de calificación", async () => {
    const movieAggregateStub = sinon.stub(Movie, "aggregate");
    movieAggregateStub.resolves([
      {
        _id: "65315ddb2470b2aac956e607",
        nombre: "Película de prueba",
        imagen: "https://ejemplo.com/imagen.jpg",
        descripcion: "Esta es una película de prueba.",
        ratingAvg: 4.5,
      },
    ]);

    const response = await request(app)
      .get("/api/movie")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    movieAggregateStub.restore();
  });
});
