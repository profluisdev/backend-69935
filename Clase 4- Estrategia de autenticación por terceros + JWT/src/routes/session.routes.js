import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getByEmail(email);
    if (!user || !isValidPassword(user.password, password)) return res.status(401).json({ status: "error", msg: "User or email invalid" });
    console.log(user);
    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }),
  async (req, res) => {
    try {
      return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
);

router.get("/current", async (req, res) => {
  const user = await userDao.getByEmail(req.session.user.email);

  res.status(200).json({ status: "ok", user });
});

export default router;
