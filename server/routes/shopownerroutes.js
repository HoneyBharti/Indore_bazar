import express from "express"
import shopownercontroller from "../controller/shopownercontroller.js"
import protect from "../middleware/authmiddleware.js"
import upload from "../middleware/fileuploadmiddleware.js"

const router = express.Router()



router.post("/create-shop", protect.authprotect , shopownercontroller.addshop)

router.post("/add-product" ,protect.authprotect , upload.single("productImage"), shopownercontroller.addproduct)

router.put("/product/:pid" , protect.authprotect, shopownercontroller.updateproduct)

router.put("/order/:oid" ,protect.authprotect, shopownercontroller.updateorder)

router.put("/shop/:sid" ,protect.authprotect , shopownercontroller.updateshop)

router.post("/coupon" ,protect.authprotect , shopownercontroller.createcoupon)

router.get("/order" ,protect.authprotect , shopownercontroller.getshoporders)

router.get("/" ,protect.authprotect , shopownercontroller.getmyshopdetails)




export default router