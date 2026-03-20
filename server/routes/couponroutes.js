import express from "express"
import couponcontroller from "../controller/couponcontroller.js"

const router = express.Router()

router.get("/:sid" ,  couponcontroller.getcoupons)

router.post("/apply"  , couponcontroller.applycoupon)

export default router