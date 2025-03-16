import { Router } from "express";
import * as messageService from "./service/message.service.js"
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./message.validation.js"
const router = Router()


router.post("/", validation(validators.sendMessage), messageService.sendMessage)
router.delete("/delete/:id", messageService.deleteMessage)

export default router;  