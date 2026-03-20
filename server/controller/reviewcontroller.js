import Order from "../models/ordermodel.js"
import Review from "../models/reviewmodel.js"

const addreview=async(req,res)=>{
    const productid = req.pid
    const userid = req.user._id
    const {text , rating} = req.body

    if(!text || !rating){
         res.status(409)
        throw new Error("please fill all details")
    }

    const orderhistory = await Order.find({user:userid})

    let purchasebefore

    orderhistory.forEach((orders)=>{
        orders.products.forEach((order)=>{
            if(order.product.toString() == productid){
                
                purchasebefore = true
                return
            }
        })
    })

    const review = await Review.create({
        user : userid,
        text : text,
        rating:rating,
        product : productid,
        isverified : purchasebefore || false
    })

    res.status(200).json(review)

}

const getreview=async(req,res)=>{

    const productid = req.pid

    let reviews = await Review.find({product : productid})

    if(!reviews){
        res.status(404)
        throw new Error("Reviews not found")
    }

    res.status(200).json(reviews)

}

const removereview=async(req,res)=>{
    const reviewid = req.params.rid

    await Review.findByIdAndDelete(reviewid)

    res.status(200).json({
        message : "Review removed" ,
        _id : reviewid
    })

}

const reviewcontroller = {addreview , getreview , removereview}

export default reviewcontroller