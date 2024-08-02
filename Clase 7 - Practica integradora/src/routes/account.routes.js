import { Router } from "express";
import accountDao from "../dao/account.dao.js";
import passport from "passport";

const router = Router();

router.put("/deposit", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;

    const queryAccount = alias ? { alias } : { number };

    const account = await accountDao.depositAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/extract", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;

    const queryAccount = alias ? { alias } : { number };

    const account = await accountDao.extractAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/transfer", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const user = req.user;
    const originAccount = await accountDao.getOne({ userId: user._id });
    const destinationQuery = alias ? { alias } : { number };
    const destinationAccount = await accountDao.getOne(destinationQuery);

    if (!originAccount || !destinationAccount) {
      return res.status(404).json({ status: "error", msg: "Account not found" });
    }

    if (originAccount.balance < amount) {
      return res.status(400).json({ status: "error", msg: "Insufficient balance" });
    }

    const accounts = await accountDao.transferBalance({ alias: originAccount.alias }, destinationQuery, amount);

    res.status(200).json({ status: "ok", accounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

export default router;
