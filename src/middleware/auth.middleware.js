import userModel from "../DB/Model/User.model.js";
import { asyncHandler } from "../utils/error/error.js";
import { verifyToken } from "../utils/security/token.js";

export const roleTypes = {
    User: 'User',
    Admin: "Admin",
    HR: 'HR'
}

export const authentication = () => {
    return asyncHandler(
        async (req, res, next) => {
            const { authorization } = req.headers
            if (!authorization) {
                return next(new Error("authorization is required", { cause: 400 }))
            }

            //////////
            const [Bearer, token] = authorization.split(" ")
            if (!Bearer || !token) {
                return next(new Error("authorization is required", { cause: 400 }))
            }

            let TOKEN_SIGNATURE = undefined;
            switch (Bearer) {
                case "Bearer":
                    TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;
                    break;
                case "Admin":
                    TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE_ADMIN;
                    break;
                default:
                    break;
            }


            const decoded = verifyToken({ token, TOKEN_SIGNATURE })
            if (!decoded?.id) {
                return next(new Error("in-valid token payload", { cause: 400 }))
            }

            const user = await userModel.findById(decoded.id)
            if (!user) {
                return next(new Error("not registered account", { cause: 404 }))
            }

            if (parseInt((user.changePasswordTime?.getTime() || 0) / 1000) >= decoded.iat) {
                return next(new Error("expired credential token", { cause: 400 }))

            }

            req.user = user;
            return next()


        }
    )
}


///////////////////////  authorization



export const authorization = (accessRloe = []) => {
    return asyncHandler(
        async (req, res, next) => {
            if (!accessRloe.includes(req.user.role)) {
                return next(new Error("not auth account", { cause: 400 }))
            }
            return next()
        }
    )
}