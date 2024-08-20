import twilio from "twilio";
import envsConfig from "../config/envs.config.js";
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = envsConfig;

export const sendSMS = async (phone, message) => {
    try {
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

        await client.messages.create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: phone,
        });
    } catch (error) {
        console.log(error);
    }
};
