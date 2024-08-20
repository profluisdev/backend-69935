import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";
import __dirname from "../../dirname.js";

export const sendEmail = async (email, subject, message, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: envsConfig.GMAIL_EMAIL,
            pass: envsConfig.GMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: envsConfig.GMAIL_EMAIL,
        to: email,
        subject: subject,
        text: message,
        html: html,
        attachments: [
            {
                filename: "gatito.jpg",
                path: __dirname + "/public/images/gatito.jpg",
                cid: "gatito",
            },
        ],
    });
};
