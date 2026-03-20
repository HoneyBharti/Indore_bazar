import fs from "node:fs"
import uploadtocloudinary from "../middleware/cloudinarymiddleware.js"
import Coupon from "../models/couponmodel.js"
import Order from "../models/ordermodel.js"
import Product from "../models/productmodel.js"
import Shop from "../models/shopmodel.js"




const addshop= async(req,res)=>{

    const {name , description , address , shopphone } = req.body
    let user = req.user.id

    if(!name || !address || !description || !shopphone){
        res.status(409)
        throw new Error("Please fill all details")
    }

    if(shopphone.length !== 10){
          res.status(409)
        throw new Error("Please enter valid phone number")
    }

    const shop = await Shop.create({name , description , address , shopphone , user})

    if(!shop){
        res.status(401)
        throw new Error("Shop not created")
    }

    res.status(200)
    res.json({message :"Request has been sent to admin",
         shop})

}

const getmyshopdetails =async(req,res)=>{

    const userid = req.user._id

    const shop = await Shop.findOne({user : userid}).populate("user")

     if(!shop){
        res.status(404)
        throw new Error("Shop not found")
    }

      res.status(200).json(shop)

}

const getshoporders =async(req,res)=>{

    const userid = req.user._id

    const shop = await Shop.findOne({user: userid})

    if(!shop){
        res.status(404)
        throw new Error("Shop not found")
    }

    let myallorders = await Order.find({shop: shop._id}).populate("user").populate("products.product").populate("shop").populate("coupon")

    if(!myallorders){
        res.status(404)
        throw new Error("Orders not found")
    }
    res.status(200).json(myallorders)
}

const updateshop= async(req,res)=>{

    let shopid = req.params.sid

if(req.body.status){
        req.body.status = "pending"

}
    const updatedshop = await Shop.findByIdAndUpdate(shopid , req.body , {new : true})

    if(!updatedshop){
         res.status(409)
        throw new Error("shop not updated")
    }

        res.status(200).json(updatedshop)

}

const addproduct = async(req,res)=>{

    const {name,description,price ,stock ,category ,shopid}= req.body


   
    if(!name || !description  || !price || !stock || !category || !shopid ){
        res.status(409)
        throw new Error("Please fill all details")
    }

    let uploadresponse = await uploadtocloudinary(req.file.path)

    fs.unlinkSync(req.file.path)
    
    const product = new Product({
        name , description , price , stock , category,  productImage : uploadresponse.secure_url , shop : shopid
    })
    
    await product.save()

   await product.populate("shop")

   if(!product){
    res.status(409)
    throw new Error("Product Not Created")
   }
   res.status(200).json(product)

}

const updateproduct= async(req,res)=>{

    const updatedproduct = await Product.findByIdAndUpdate(req.params.pid , req.body , {new : true}).populate("shop")

    if(!updatedproduct){
        res.status(409)
        throw new Error("Product not updated")
    }

    res.status(200).json(updatedproduct)

}

const createcoupon = async(req,res)=>{

    const userid = req.user._id
    const {coupondiscount , couponcode } = req.body

    if(!couponcode || !coupondiscount){
        res.status(409)
        throw new Error("Please fill all details")
    }

    const shop  = await Shop.findOne({user:userid})

    const coupon = new Coupon({
        couponcode : couponcode.toUpperCase()
        ,coupondiscount,
        shop : shop._id
    })

await coupon.save()

// await coupon.populate("shop")

if(!coupon){
        res.status(404)
        throw new Error("Coupon not created")
    }

    res.status(200).json(coupon)
}

const updateorder= async(req,res)=>{

    const orderid = req.params.oid

    const order = await Order.findById( orderid).populate("products.product")

    const {status} = req.body
    if(!status){
        res.status(409)
        throw new Error("Please fill all details")
    }

    const updatstock = async(productid , stock)=>{
     await Product.findByIdAndUpdate(productid ,{stock:stock}, {new:true})
    }

    let updatedorder

    if(status == "cancelled"){
     updatedorder= await Order.findByIdAndUpdate(req.params.oid , {status: "cancelled"} , {new : true}).populate("user").populate("products.product").populate("shop").populate("coupon")
  }
  else if(status == "dispatched"){
    
    order.products.forEach((product) =>{

        let productid = product.product._id
        let productqty = product.qty
        let currentstock = product.product.stock
        updatstock(productid , currentstock - productqty)
    })
          updatedorder= await Order.findByIdAndUpdate(req.params.oid , {status: "dispatched"} , {new : true}).populate("user").populate("products.product").populate("shop").populate("coupon")

  }else{
         updatedorder= await Order.findByIdAndUpdate(req.params.oid , {status: "delivered"} , {new : true}).populate("user").populate("products.product").populate("shop").populate("coupon")

  }


    if(!updatedorder){
        res.status(404)
        throw new Error("Order not updated")
    }
    res.status(200).json(updatedorder)

}

const shopownercontroller ={addshop , addproduct , updateproduct, updateorder ,updateshop , createcoupon , getmyshopdetails , getshoporders}

export default shopownercontroller