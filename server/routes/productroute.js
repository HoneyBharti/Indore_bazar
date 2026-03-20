import express from "express"
import productcontroller from "../controller/productcontroller.js"
import reviewroutes from "../routes/reviewroutes.js"

const router = express.Router({mergeParams : true})

router.get("/" , productcontroller.getproducts)

router.get("/:pid" , productcontroller.getproduct)

router.get("/search/:query" , productcontroller.searchproduct)

const productmiddleware = async(req,res,next)=>{

    req.pid = req.params.pid
    next()
}

router.use("/:pid/review" , productmiddleware , reviewroutes)

export default router