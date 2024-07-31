import { Router } from "express";
import accountDao from "../dao/account.dao.js";

const router = Router();

router.put("/deposit", async (req, res) => {
  try {

    const { amount, alias, number } = req.body;

    const queryAccount = alias ? {alias} : {number};

    const account = await accountDao.depositAccount(queryAccount, amount);

    res.status(201).json({ status: "ok", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
  
})

export default router;