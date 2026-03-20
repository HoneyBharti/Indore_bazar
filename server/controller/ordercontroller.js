import Cart from "../models/cartmodel.js"
import Coupon from "../models/couponmodel.js"
import Order from "../models/ordermodel.js"

const getmyorders = async(req,res)=>{

    const userid = req.user._id
    const orders = await Order.find({user:userid}).populate("user").populate("products.product").populate("shop").populate("coupon")

    if(!orders){
        res.status(404)
        throw new Error("Orders not found")
    }
    res.status(200).json(orders)
}

const getmyorder = async(req,res)=>{
        const userid = req.user._id

  const order = await Order.findById(req.params.oid, {user :userid}).populate("user").populate("products").populate("shop").populate("coupon")

    if(!order){
        res.status(404)
        throw new Error("Orders not found")
    }
    res.status(200).json(order)
}

const cancelorder = async(req,res)=>{

const order = await Order.findById(req.params.oid)
console.log(order)
if(order.status == "placed"){
    const cancelorder = await Order.findByIdAndUpdate(req.params.oid , {status: "cancelled"}, {new:true})
    res.status(200).json(cancelorder)
}

else{
    res.status(409)
    throw new Error("Order cannot be cancelled after dispatched")
}


}

const createorder = async(req,res)=>{

    const userid = req.user._id

    let couponexists

if(req.body.couponcode){
     couponexists = await Coupon.findOne({couponcode : req.body.couponcode})

    if(!couponexists){
        res.status(404)
        throw new Error("Coupon not found")
    }
}

    const cart = await Cart.findOne({user : userid}).populate("products.product")

    if(!cart){
        res.status(404)
        throw new Error("Cart not found")
    }

    let billedproducts = cart.products.map((product)=>{
        return{
            product : product.product._id,
            qty: product.qty,
            purchasedprice: product.product.price
        }
    })

    let totalbill = cart.products.reduce((acc,item)=>{
        return acc+ item.product.price * item.qty

    },0)

    let shop = cart.products[0].product.shop

    const order=new Order({
        user:userid,
        products:billedproducts,
        shop:shop,
        status:"placed",
        isDiscounted : couponexists ? true : false,
        coupon : couponexists ?  couponexists._id : null,
        totalbillamount: totalbill - (couponexists ? totalbill* couponexists.coupondiscount/100 : 0)
        

    })

        await order.populate("products.product")
    await order.save()

    if(!order){
        res.status(409)
        throw new Error("Order not placed")
    }

    res.status(200).json(order)

   await cart.deleteOne({user : userid})
}

const ordercontroller = {getmyorders , getmyorder , createorder , cancelorder}

export default ordercontroller