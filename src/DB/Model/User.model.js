import mongoose, { Schema, model } from "mongoose";
import { roleTypes } from "../../middleware/auth.middleware.js";


export const genderTypes = {
    male: "male",
    female: "female",
}
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailOTP: String,
    password: {
        type: String,
        required: true,
    },
    forgetPasswordOTP: String,
    phone: String,
    image: String,
    DOB: Date,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: Object.values(genderTypes),
        default: 'male'
    },
    role: {
        type: String,
        enum: Object.values(roleTypes), // القيم المسموح بها بناءً على `roleTypes`
        default: "User"
    },
    changePasswordTime: Date,
    accountDeleted: {
        type: Boolean,
        default: false
    },
    changeCredentialsTime: Date,
}, { timeseries: true })


const userModel = mongoose.models.User || model("User", userSchema)
export default userModel

