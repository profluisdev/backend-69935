import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se a visitado el sitio ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido al sitio");
  }
});

router.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (username !== "pepe" || password !== "123") {
    return res.send("Usuario o contraseña no válidos");
  }

  req.session.user = username;
  req.session.admin = true;
  res.send(`Bienvenido ${username}`);
});

router.get("/admin", (req, res) => {
  console.log(req.session.admin);
  if (!req.session.admin) {
    return res.send("Quien sos vo? anda palla ...");
  }

  res.send(`Bienvenido ${req.session.user} administrado`);
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.send("Session cerrada");
});

export default router;
