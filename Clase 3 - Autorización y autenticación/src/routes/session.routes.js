import { Router } from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";

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

router.get("/current", async (req, res) => {
  const user = await userDao.getByEmail(req.session.user.email);

  res.status(200).json({ status: "ok", user });
});

export default router;
