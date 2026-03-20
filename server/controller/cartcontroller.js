import Cart from "../models/cartmodel.js"
import Product from "../models/productmodel.js"

const getcart =async(req,res)=>{
const userid = req.user._id

const cart = await Cart.findOne({user : userid}).populate("products.product")

if(!cart){
    res.status(200)
    res.json({
        products:[]
    })
}

res.status(200).json(cart)
}

const addtocart =async(req,res)=>{

    const {productid,qty=1}= req.body
    const userid = req.user._id

    const product = await Product.findById(productid)

    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }

    if(product.stock< qty){
        res.status(400)
        throw new Error("Insufficient stock")
    }

    let cart = await Cart.findOne({user:userid})

    if(!cart){
        cart = new Cart({
            user:userid,
            products :[ {product:productid , qty}]
        })
    }

    else{
        const productindex= cart.products.findIndex((item)=>{
           return item.product.toString()== productid
        })

        if(productindex > -1){
            cart.products[productindex].qty += parseInt(qty)

            if(cart.products[productindex].qty > product.stock){
                res.status(400)
                throw new Error("Quantity exceeds available stock")
            }
        }
        else{
            cart.products.push({product: productid , qty})
        }

    }

    await cart.save()

    await cart.populate("products.product")

    res.status(200).json(cart)

}

const updatecart =async(req,res)=>{

 const {productid,qty}= req.body
    const userid = req.user._id

    if(qty<1){
        res.status(400)
        throw new Error("Quantity must be at least 1")
    }

    const cart = await Cart.findOne({user :userid })

    if(!cart){
        res.status(404)
        throw new Error("Cart not found")
    }

    const productindex = cart.products.findIndex((item)=>item.product.toString()==productid)

    if(productindex == -1){
        res.status(404)
        throw new Error("Product not found in cart")
    }

    const product = await Product.findById(productid)

    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }

    if(qty> product.stock){
        res.status(400)
        throw new Error("Quantity exceeds available stock")
    }

    cart.products[productindex].qty= qty

    await cart.save()
    await cart.populate("products.product")

    res.status(200).json(cart)
}

const removecart =async(req,res)=>{
    
    const{productid} =req.params
    const userid = req.user._id

    const cart = await Cart.findOne({user : userid})

    if(!cart){
        res.status(404)
        throw new Error("Cart not found")
    }

    cart.products = cart.products.filter((item)=> item.product.toString()!== productid)

    await cart.save()
    await cart.populate("products.product")

    res.status(200).json(cart)
}

const clearcart =async(req,res)=>{
      const userid = req.user._id

    const cart = await Cart.findOne({user : userid})

    if(!cart){
        res.status(404)
        throw new Error("Cart not found")
    }

    cart.products=[]
    await cart.save()

    res.status(200).json(cart)

}

const cartcontroller = {getcart , addtocart , updatecart , removecart , clearcart}

export default cartcontroller