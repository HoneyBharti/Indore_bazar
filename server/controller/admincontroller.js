import Order from "../models/ordermodel.js"
import Shop from "../models/shopmodel.js"
import User from "../models/usermodel.js"
const getusers = async(req,res)=>{

    const users = await User.find()

    if(!users){
        res.status(409)
        throw new Error("user not found")
    }

   res.status(200)
    res.json(users)

}

const getallshops = async(req,res)=>{

    const shops = await Shop.find().populate("user")

    if(!shops){

        res.status(404)
        throw new Error('Shops not found')
    }

    res.status(200).json(shops)
}

const getallorders =async(req ,res)=>{

const allorders = await Order.find().populate("user").populate("products.product").populate("shop").populate("coupon")

if(!allorders){
    res.status(404)
    throw new Error("Order not found")
}

res.status(200)
res.json(allorders)  

}

const updateshop =async(req ,res)=>{

    if(!req.body.status){
        res.status(409)
        throw new Error("please fill status")
    }

 let shopid = req.params.sid

const updatedshop = await Shop.findByIdAndUpdate(shopid , req.body , {new : true})

if(!updatedshop){
    res.status(409)
    throw new Error("shop cannot updated")
}

await User.findByIdAndUpdate(updatedshop.user, {isShopowner:true} , {new:true})

res.status(200).json(updatedshop)
}



const updateuser =async(req ,res)=>{

    // if(!req.body.isActive){
    //     res.status(409)
    //     throw new Error("please send the status of user")
    // }

const updateduser = await User.findByIdAndUpdate(req.params.uid , {isActive : req.body.isActive ? true : false} , {new: true} )

if(!updateduser){
    res.status(404)
    throw new Error("user not updated")
}

res.status(200)
res.json(updateduser)

}


const admincontroller = { getusers , getallorders ,  updateshop , updateuser , getallshops}

export default admincontroller