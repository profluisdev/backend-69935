import { Router } from "express";
import { sendEmail } from "../utils/sendEmail.js";
import { sendSMS } from "../utils/sendSMS.js";

const router = Router();

router.get("/email", async (req, res) => {
    try {
        const { email, subject, message, html } = req.body;

        await sendEmail(email, subject, message, html);

        res.status(200).send("Email sent");
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
});

router.get("/sms", async (req, res) => {
    try {
        const { phone, message } = req.body;

        await sendSMS(phone, message);

        res.status(200).send("Send sms");
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal Server Error" });
    }
});

export default router;
