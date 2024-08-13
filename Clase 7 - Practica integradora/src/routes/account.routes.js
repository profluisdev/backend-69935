import { Router } from "express";
import accountDao from "../dao/account.dao.js";
import passport from "passport";
import movementDao from "../dao/movement.dao.js";
import userDao from "../dao/user.dao.js";

const router = Router();

router.put("/deposit", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;

    const queryAccount = alias ? { alias } : { number };

    const accountData = await accountDao.getOne({ alias });

    await movementDao.create({
      amount,
      description,
      operationType: "deposit",
      originAccountId: accountData._id,
      userId: req.user._id,
    });

    const account = await accountDao.depositAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/extract", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;

    const queryAccount = alias ? { alias } : { number };
    const accountData = await accountDao.getOne({ alias });

    await movementDao.create({
      amount: amount * -1,
      description,
      operationType: "extract",
      originAccountId: accountData._id,
      userId: req.user._id,
    });
    const account = await accountDao.extractAccount(queryAccount, amount);

    res.status(200).json({ status: "ok", account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

router.put("/transfer", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;
    const user = req.user;
    const originAccount = await accountDao.getOne({ userId: user._id });
    const destinationQuery = alias ? { alias } : { number };
    const destinationAccount = await accountDao.getOne(destinationQuery);
    const destinationUser = await userDao.getOne({_id: destinationAccount.userId});
    console.log(destinationUser);
    if (!originAccount || !destinationAccount) {
      return res.status(404).json({ status: "error", msg: "Account not found" });
    }

    if (originAccount.balance < amount) {
      return res.status(400).json({ status: "error", msg: "Insufficient balance" });
    }

    // destination
    await movementDao.create({
      amount,
      description,
      operationType: "transfer",
      originAccountId: originAccount._id,
      destinationAccountId: destinationAccount._id,
      userId: destinationUser._id
    });

    // origen
    await movementDao.create({
      amount: amount * -1,
      description,
      operationType: "Transfer",
      originAccountId: originAccount._id,
      destinationAccountId: destinationAccount._id,
      userId: req.user._id
    });

    const accounts = await accountDao.transferBalance({ alias: originAccount.alias }, destinationQuery, amount);

    res.status(200).json({ status: "ok", accounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
});

export default router;
