import express from "express"
import reviewcontroller from "../controller/reviewcontroller.js"
import protect from "../middleware/authmiddleware.js"

const router = express.Router()

router.get("/" , reviewcontroller.getreview)

router.post("/" , protect.authprotect , reviewcontroller.addreview)

router.delete("/:rid" , protect.authprotect , reviewcontroller.removereview)

export default router