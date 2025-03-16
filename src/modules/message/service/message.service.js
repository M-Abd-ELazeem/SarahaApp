import mongoose from "mongoose";
import { messageModel } from "../../../DB/Model/message.model.js";
import userModel from "../../../DB/Model/User.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { seccessResponse } from "../../../utils/response/success.response.js";

export const sendMessage = asyncHandler(
    async (req, res, next) => {
        const { message, recipentId } = req.body;
        const user = await userModel.findOne({ _id: recipentId, accountDeleted: false });
        if (!user) {
            return next(new Error("Invalid recipient", { cause: 404 }));
        }
        const newMessage = await messageModel.create({ message, recipentId })
        return seccessResponse({ res, message: "Done", status: 201 })

    }
)

export const deleteMessage = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error("Invalid ObjectId format", { cause: 400 }));
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const message = await messageModel.findOne({ _id: objectId });
    if (!message) {
        return next(new Error("Message not found", { cause: 404 }));
    }
    await messageModel.deleteOne({ _id: objectId });
    return seccessResponse({ res, message: "Message deleted successfully", status: 200 });
});