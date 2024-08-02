import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/jwt.js";

const router = Router();
router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
  try {
    const token = createToken(req.user);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

export default router;
