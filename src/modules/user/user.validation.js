import joi from 'joi';
import { generalFields } from '../../middleware/validation.middleware.js';




export const undateProfile = joi.object().keys(
    {
        userName: generalFields.userName,
        phone: generalFields.phone,
        gender: generalFields.gender,
        DOB: joi.date().less('now')
    }
).required()

export const undatePassword = joi.object().keys(
    {
        oldPassword: generalFields.password.required(),
        password: generalFields.password.not(joi.ref("oldPassword")).required(),
        confirmationPassword: generalFields.confirmationPassword.valid(joi.ref("password")).required(),
    }
).required()


export const shareProfile = joi.object().keys({
        userId: generalFields.id.required()
    }).required()