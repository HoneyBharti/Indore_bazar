import express from "express"
import getanswers from "../controller/chatbotcontroller.js"
import protect from "../middleware/authmiddleware.js"

const router = express.Router()

router.post("/" , protect.authprotect , getanswers)

export default router