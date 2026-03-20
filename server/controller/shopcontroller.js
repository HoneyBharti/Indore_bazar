import Shop from "../models/shopmodel.js"

const getshops = async(req, res)=>{

    const shops = await Shop.find()

    if(!shops){
        res.status(404)
        throw new Error("Shops not found")
    }

    let activeshops = shops.filter(shop=> shop.status== "accepted")

    res.status(200).json(activeshops)
}


const getshop = async(req, res)=>{
    
      const shop = await Shop.findById(req.params.sid)

    if(!shop){
        res.status(404)
        throw new Error("Shop not found")
    }

    res.status(200).json(shop)
}


const shopcontroller ={getshops , getshop}


export default shopcontroller