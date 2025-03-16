import userModel from "../../../DB/Model/User.model.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { seccessResponse } from "../../../utils/response/success.response.js";
import { comparHash, generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import { verifyToken } from "../../../utils/security/token.js";



// signup

export const signup = asyncHandler(
    async (req, res, next) => {
        const { userName, email, password, confirmationPassword, phone } = req.body
        console.log({ userName, email, password, confirmationPassword, phone });
        // check is password and confirmationPassword Match
        if (password !== confirmationPassword) {
            return next(new Error("password and confirmationPassword misMatch", { cause: 400 }))
        }
        //check is email token
        if (await userModel.findOne({ email })) {
            return next(new Error("email exists", { cause: 409 }))
        }

        const encryptPhone = generateEncryption({ plaintext: phone })
        //hash  
        const hashPassword = generateHash({ plaintext: password, salt: 10 })
        const user = await userModel.create({ userName, email, password: hashPassword, phone: encryptPhone })
        emailEvent.emit("sendConfirmEmail", { email })
        return seccessResponse({ res, message: "done", data: { user }, status: 201 })
    }
)




///confirmEmail 
export const confirmEmail = asyncHandler(async (req, res, next) => {
    //confirm email token
    // const { authorization } = req.headers;
    // const decoded = verifyToken({ token: authorization, signature: process.env.EMAIL_TOKEN_SIGNATURE })
    // const user = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true }, { new: true })

    //confirm email otp
    const { email, code } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return next(new Error("Email not exist", { cause: 404 }))
    }
    if (user.confirmEmail) {
        return next(new Error("Already confirmed", { cause: 409 }))
    }
    if (!comparHash({ plaintext: `${code}`, hashValue: user.emailOTP })) {
        return next(new Error("In-valid otp", { cause: 400 }))
    }

    await userModel.updateOne({ email }, { confirmEmail: true, $unset: { emailOTP: 0 } })


    return seccessResponse({ res,status:200, message: "done", data: { user } })

})





