import { Router } from "express";
import passport from "passport";
import movementDao from "../dao/movement.dao.js";

const router = Router();
router.get("/user/:uid", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { uid } = req.params;
    const movements = await movementDao.getAll({ userId: uid });
    res.status(200).json({status: "ok", movements});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});
export default router;
