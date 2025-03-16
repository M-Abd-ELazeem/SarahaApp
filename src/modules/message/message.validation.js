import joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const sendMessage =joi.object().keys({
    message: joi.string().pattern(new RegExp(/^[a-zA-Z\u0621-\u064Aء-ئ][a-zA-Z\u0621-\u064Aء-ئ0-9\s.,!?-]{2,50000}$/)).required(),
    recipentId:generalFields.id.required()
}).required()
export const deleteMessage =joi.object().keys({
    id:generalFields.id.required()
}).required()