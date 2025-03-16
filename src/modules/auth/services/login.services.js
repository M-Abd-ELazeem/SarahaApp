import userModel from "../../../DB/Model/User.model.js";
import { roleTypes } from "../../../middleware/auth.middleware.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { seccessResponse } from "../../../utils/response/success.response.js";
import { comparHash, generateHash } from "../../../utils/security/hash.js";
import { generateToken } from "../../../utils/security/token.js";


// login

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    console.log({ email, password });

    // check email
    const user = await userModel.findOne({ email })
    console.log({ user });

    if (!user) {
        return next(new Error("In-valid Account", { cause: 404 }))
    }
    // check confirm email
    if (!user.confirmEmail) {
        return next(new Error("please confirm email frist", { cause: 404 }))

    }
    // check password
    if (!comparHash({ plaintext: password, hashValue: user.password })) {
        return next(new Error("In-valid Account credatial", { cause: 404 }))
    }

    user.accountDeleted = false;
    await user.save();
    //jwtoken
    const token =
        generateToken({
            payload: { id: user._id },
            signature: user.role == roleTypes.User ? process.env.TOKEN_SIGNATURE : process.env.TOKEN_SIGNATURE_ADMIN,
            options: { expiresIn: '1y' }
        })

    return seccessResponse({ res, status: 200, message: "done", data: { token } })


})

export const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email, accountDeleted: false })
    console.log(user);

    if (!user) {
        return next(new Error("In-valid Account", { cause: 404 }))
    }
    if (!user.confirmEmail) {
        return next(new Error("please cofirmEmail", { cause: 404 }))
    }
    emailEvent.emit("sendForgetPassword", { email })
    return seccessResponse({ res, status: 200, message: "done", })


})


export const resetPassword = asyncHandler(async (req, res, next) => {
    const { email, code, password } = req.body;

    const user = await userModel.findOne({ email, accountDeleted: false })
    console.log(user);

    if (!user) {
        return next(new Error("In-valid Account", { cause: 404 }))
    }
    if (!comparHash({ plaintext: code, hashValue: user.forgetPasswordOTP })) {
        return next(new Error("In-valid reset code", { cause: 400 }))
    }
    const hashPassword = generateHash({ plaintext: password })
    await userModel.updateOne({ email }, {
        password: hashPassword,
        confirmEmail: true,
        changeCredentialsTime: Date.now(),
        $unset: { forgetPasswordOTP: 0 }
    })
    emailEvent.emit("sendForgetPassword", { email })

    return seccessResponse({ res, status: 200, message: "done", })

})
