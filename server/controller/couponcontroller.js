import Coupon from "../models/couponmodel.js"

const getcoupons = async(req, res)=>{

    const shopid = req.params.sid

    const coupons = await Coupon.find({shop : shopid})

    if(!coupons){
        res.status(404)
        throw new Error("Coupons not found")
    }

    res.status(200).json(coupons)


}


const applycoupon =async(req,res)=>{

    const {shopid , couponcode} = req.body

    if(!shopid || !couponcode){
        res.status(409)
        throw new Error("Please fill all details")
    }

    const couponexists = await Coupon.findOne({couponcode : couponcode})

    if(!couponexists){
        res.status(404)
        throw new Error("Coupon not found")
    }

    if(couponexists.shop.toString() !== shopid){
        res.status(409)
        throw new Error("This coupon is not valid for this shop")
    }

    if(couponexists.isActive){
          res.status(200).json(couponexists)
    }else{
         res.status(409)
        throw new Error("Coupon expired")
    }


}



const couponcontroller = {getcoupons , applycoupon}

export default couponcontroller