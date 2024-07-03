import express from "express";
import { connectDb } from "./config/mongoDb.config.js";
import userRoutes from "./router/user.routes.js"

const app = express();

connectDb();
// Middlewares incorporados de Express
app.use(express.json());  // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.

app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Server on port 8080");
});
