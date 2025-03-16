import { Router } from "express";
import * as userServices from "./services/user.services.js"
import { authentication, authorization, roleTypes } from "../../middleware/auth.middleware.js";
import { endPoint } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./user.validation.js"
const router = Router();


router.get("/profile", authentication(), authorization(endPoint.profile), userServices.userProfile)
router.patch("/profile", validation(validators.undateProfile), authentication(), authorization(endPoint.profile), userServices.undateProfile)
router.patch("/profile/password", validation(validators.undatePassword), authentication(), authorization(endPoint.profile), userServices.undatePassword)
router.delete("/profile/", authentication(), authorization(endPoint.profile), userServices.freezAccount)
router.get("/:userId/profile/",validation(validators.shareProfile) ,  userServices.shareProfile)
export default router


