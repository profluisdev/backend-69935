import express from "express";
import envsConfig from "./config/envs.config.js";
import routes from "./routes/index.routes.js";
import passport from "passport";
import session from "express-session";
import { connectDB } from "./config/mongoDb.config.js";
import { initializePassport } from "./config/passport.config.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "123",
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/api", routes);

app.listen(envsConfig.PORT, () => {
  console.log(`Server on port ${envsConfig.PORT}`);
});
