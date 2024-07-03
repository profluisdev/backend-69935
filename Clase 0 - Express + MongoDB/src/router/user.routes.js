import { Router } from "express";
import userDao from "../dao/user.dao.js";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const users = await userDao.getAll();

    res.status(200).json({ status: "ok", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userDao.create(req.body);

    res.status(200).json({ status: "ok", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});
export default router;
