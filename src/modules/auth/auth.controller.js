import { Router } from 'express'
import * as registrationservices from './services/registration.services.js'
import * as loginservices from './services/login.services.js'
import { validation } from '../../middleware/validation.middleware.js'
import * as validators from './auth.validation.js'

const router = Router()




router.post("/signup", validation(validators.signup), registrationservices.signup)
router.patch("/confirm-email", validation(validators.confirmEmail), registrationservices.confirmEmail)
router.post("/login", validation(validators.login), loginservices.login)
router.patch("/forget-password", validation(validators.forgetPassword), loginservices.forgetPassword)
router.patch("/reset-password", validation(validators.resetPassword), loginservices.resetPassword)
export default router;




