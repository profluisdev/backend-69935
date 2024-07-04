import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import viewRoutes from "./routes/views.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(cookieParser("secretCoder"));
app.use(
  session({
    secret: "secretCoder", // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);

app.use("/", viewRoutes);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
