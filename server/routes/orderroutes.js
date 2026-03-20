import express from "express"
import protect from "../middleware/authmiddleware.js"
import ordercontroller from "../controller/ordercontroller.js"

const router = express.Router()

router.get("/" , protect.authprotect , ordercontroller.getmyorders)

router.get("/:oid" , protect.authprotect , ordercontroller.getmyorder)

router.post("/" , protect.authprotect , ordercontroller.createorder)

router.put("/:oid" , protect.authprotect , ordercontroller.cancelorder)

export default router