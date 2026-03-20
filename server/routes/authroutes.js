import express from "express"
import authcontroller from "../controller/authcontroller.js"
import protect from "../middleware/authmiddleware.js"

const router = express.Router()


router.post("/register" , authcontroller.registeruser)
router.post("/login" , authcontroller.loginuser)
router.post("/private" ,protect.authprotect , authcontroller.privateaccess)


export default router