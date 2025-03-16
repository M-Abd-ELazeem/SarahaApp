import JWT from "jsonwebtoken"


export const generateToken = ({ payload = {}, signature = process.env.TOKEN_SIGNATURE, options = {} } = {}) => {
    const token = JWT.sign(payload, signature, options)
    return token
}


export const verifyToken = ({ token = "", signature = process.env.TOKEN_SIGNATURE } = {}) => {
    const decoded = JWT.verify(token, signature)
    return decoded
}