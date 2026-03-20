import express from "express"
import cartcontroller from "../controller/cartcontroller.js"
import protect from "../middleware/authmiddleware.js"

const router = express.Router()

router.get("/" , protect.authprotect , cartcontroller.getcart)

router.post("/" , protect.authprotect , cartcontroller.addtocart)

router.put("/:cid" , protect.authprotect , cartcontroller.updatecart)

router.delete("/:productid" , protect.authprotect , cartcontroller.removecart )

router.post("/clear" , protect.authprotect , cartcontroller.clearcart )



export default router