import { EventEmitter } from "node:events";
import { confirmEmailTemplate } from "../template/confirmEmail.js";
import { sendEmail } from "../email/email.js";
import { generateToken } from "../security/token.js";
//otp
import { nanoid, customAlphabet } from 'nanoid'
import { verficatioinEmailTemplate } from "../email/template/verfication.email.js";
import userModel from "../../DB/Model/User.model.js";
import { generateHash } from "../security/hash.js";

export const emailEvent = new EventEmitter();

// emailEvent.on("sendConfirmEmail", async ({ email } = {}) => {
//     //// Confirm Email
//     const emailToken = generateToken({ payload: { email }, signature: process.env.EMAIL_TOKEN_SIGNATURE })
//     const emailLink = `${process.env.FE_URL}/confirm-email/${emailToken}`
//     const html = confirmEmailTemplate({ link: emailLink })
//     await sendEmail({ to: email, subject: "confirmEMail", html })

// })


emailEvent.on("sendConfirmEmail", async (data) => {
    const { email } = data;
    const otp = customAlphabet("0123456789", 4)();
    const html = verficatioinEmailTemplate({ code: otp });
    const emailOTP = generateHash({ plaintext: `${otp}` })
    await userModel.updateOne({ email }, { emailOTP })
    await sendEmail({ to: email, subject: "confirm-Email", html })

})
emailEvent.on("sendForgetPassword", async (data) => {
    const { email } = data;
    const otp = customAlphabet("0123456789", 4)();
    const html = verficatioinEmailTemplate({ code: otp });
    const forgetPasswordOTP = generateHash({ plaintext: `${otp}` })
    await userModel.updateOne({ email }, { forgetPasswordOTP })
    await sendEmail({ to: email, subject: "Forget-Password", html })

})
