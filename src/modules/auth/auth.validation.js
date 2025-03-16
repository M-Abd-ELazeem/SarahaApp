import joi from 'joi'
import { generalFields } from '../../middleware/validation.middleware.js'


//validation signup
export const signup = joi.object().keys({
    userName: generalFields.userName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.valid(joi.ref('password')).required(),
    phone: generalFields.phone.required(),
    'accept-language': generalFields.acceptLanguage.required(),

})


// confirmEmail
export const confirmEmail = joi.object().keys({
    email: generalFields.email.required(),
    code: generalFields.code.required()

}).options({ allowUnknown: false }).required() //default for allowUnknown is  false --don't use it


// login
export const login = joi.object().keys({
    email: generalFields.email.required(),
    password: generalFields.password.required(),

}).options({ allowUnknown: false }).required()


// forgetPassword
export const forgetPassword = joi.object().keys({
    email: generalFields.email.required()
}).options({ allowUnknown: false }).required()


// resetPassword
export const resetPassword = joi.object().keys({
    email: generalFields.email.required(),
    code: generalFields.code.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.valid(joi.ref('password')).required(),

}).options({ allowUnknown: false }).required()


