import { messageModel } from "../../../DB/Model/message.model.js";
import userModel from "../../../DB/Model/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { seccessResponse } from "../../../utils/response/success.response.js";
import { generateDecription, generateEncryption } from "../../../utils/security/encryption.js";
import { comparHash, generateHash } from "../../../utils/security/hash.js";


export const shareProfile = asyncHandler(
    async (req, res, next) => {

        const user = await userModel.findById(req.params.userId).select("userName image")

        return user ? seccessResponse({ res, message: "done", data: { user } }) :
            next(new Errer("In-valid account id", { cause: 404 }))

    }
)
export const userProfile = asyncHandler(
    async (req, res, next) => {

        req.user.phone = generateDecription({ ciphertext: req.user.phone })
        const messages = await messageModel.find({ recipentId: req.user._id }).populate([
            {
                path: 'recipentId',
                select:"-password",
            }])

        return seccessResponse({ res, message: "done", data: { user: req.user, messages } })

    }
)


export const undateProfile = asyncHandler(
    async (req, res, next) => {
        const { userName, gender, DOB } = req.body
        if (req.body.phone) {
            req.body.phone = generateEncryption({ plaintext: req.user.phone })
        }

        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })

        req.user.phone = generateDecription({ ciphertext: req.user.phone })

        return seccessResponse({ res, status: 200, data: { user } })

    }
)



export const undatePassword = asyncHandler(
    async (req, res, next) => {
        const { password, oldPassword } = req.body
        console.log({ password, oldPassword });

        if (!comparHash({ plaintext: oldPassword, hashValue: req.user.password })) {
            return next(new Error("Invalid user password", { cause: 400 }))
        }
        const hashPassword = generateHash({ plaintext: password })
        const user = await userModel.findByIdAndUpdate(req.user._id, { password: hashPassword, changePasswordTime: Date.now() }, { new: true })

        return seccessResponse({ res, status: 200, data: { user } })

    }
)
export const freezAccount = asyncHandler(
    async (req, res, next) => {

        const user = await userModel.findByIdAndUpdate(req.user._id, { accountDeleted: true, changePasswordTime: Date.now() }, { new: true })

        return seccessResponse({ res, status: 200, data: { user } })

    }
)
