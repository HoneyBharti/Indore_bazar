import express from "express"
import shopcontroller from "../controller/shopcontroller.js"

const router = express.Router()


router.get("/" , shopcontroller.getshops)

router.get("/:sid" , shopcontroller.getshop)

export default router