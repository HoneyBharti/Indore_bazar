import express from "express"
import admincontroller from "../controller/admincontroller.js"
import protect from "../middleware/authmiddleware.js"
const router = express.Router()

router.get('/users' , protect.adminprotect, admincontroller.getusers)

router.get('/orders' , protect.adminprotect, admincontroller.getallorders)

router.get('/shops' , protect.adminprotect, admincontroller.getallshops)

router.put('/shops/:sid' , protect.adminprotect, admincontroller.updateshop)

router.put('/users/:uid' , protect.adminprotect, admincontroller.updateuser)






export default router