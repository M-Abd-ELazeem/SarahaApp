import joi from "joi";
import { genderTypes } from "../DB/Model/User.model.js";
import { Types } from "mongoose";
export const validationObjectid = (value, helper) => {
    return Types.ObjectId.isValid(value)
        ? true
        : helper.message("Invalid ObjectId")
};


export const generalFields = {
    userName: joi.string().empty('').default("Hambozo").min(2).max(25),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: { allow: ['com'] } }).messages({
        "string.email": "please enter a valid email format like example@gmail.com",
        "string.empty": " email cannot be empty",
        "any.required": "email is required",
    }),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmationPassword: joi.string(),
    phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    acceptLanguage: joi.string().valid("en", "ar").default("en"),
    gender: joi.string().valid(genderTypes.female, genderTypes.male),
    id: joi.string().custom(validationObjectid),
    code: joi.string().pattern(new RegExp(/^\d{4}$/)),

}

export const validation = (schema) => {
    return (req, res, next) => {
        console.log(req.headers['accept-language']);
        const inputData = { ...req.body, ...req.query, ...req.params };
        if (req.headers['accept-language']) {
            inputData['accept-language'] = req.headers['accept-language'];
        }
        const validationError = schema.validate(inputData, { abortEarly: false });
        if (validationError.error) {
            return res.status(400).json({ message: "validation result", validationError: validationError.error.details })
        }
        return next()
    }
}





export const validation_old = (schema) => {
    return (req, res, next) => {
        console.log(schema);
        console.log(Object.keys(schema));

        const validationResult = []
        for (const key of Object.keys(schema)) {
            console.log(key);
            const validationError = schema[key].validate(req[key], { abortEarly: false })
            if (validationError.error) {
                validationResult.push(validationError.error.details)
            }
        }
        if (validationResult.length > 0) {
            return res.status(400).json({ message: "validation result", validationError: validationError.error.details })
        }
        return next()

    }
}