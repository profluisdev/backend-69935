import { Router } from "express";
import passport from "passport";

const router = Router();
router.post("/register", passport.authenticate("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", user: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

export default router;
