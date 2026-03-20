import Product from "../models/productmodel.js"

const getproducts =async(req,res)=>{

    const allproducts = await Product.find().populate("shop")

    if(!allproducts){
        res.status(404)
        throw new Error("products not found")
    }

    res.status(200)
    res.json(allproducts)

}

const getproduct =async(req,res)=>{

const product = await Product.findById(req.params.pid).populate("shop")

    if(!product){
        res.status(404)
        throw new Error("product not found")
    }

    res.status(200)
    res.json(product)}

const searchproduct =async(req,res)=>{

    res.send("product search")
}


const productcontroller ={getproducts , getproduct , searchproduct}

export default productcontroller