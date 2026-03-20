import axios from "axios"

const fetchshopdetails= async(token)=>{

    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get("/api/shop-owner" ,options)
    localStorage.setItem("shop" , JSON.stringify(response.data))
    return response.data
}


const fetchshopproducts = async(shopid)=>{

    const response = await axios.get("/api/products" )
    const data = response.data.filter((product)=>{
        if(product.shop._id == shopid){
            return true
        }
    })
    return data

}


const fetchshoporders= async(token)=>{

    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get("/api/shop-owner/order" ,options)
    return response.data
}


const fetchshopcoupons= async(token ,shopid )=>{
const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.get(`/api/coupons/${shopid}` , options)
    return response.data
}

const createproduct = async(token ,FormData )=>{
const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.post("/api/shop-owner/add-product" , FormData , options)
    return response.data
}

const updateproduct = async(token ,FormData )=>{
const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.put(`/api/shop-owner/product/${FormData._id}` , FormData , options)
    return response.data
}


const updateorder = async(token , orderdetails )=>{
const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.put(`/api/shop-owner/order/${orderdetails.id}` , orderdetails , options)
    return response.data
}


const couponcreate = async(token , formData )=>{
const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.post("/api/shop-owner/coupon" , formData , options)
    return response.data
}



const shopservice = {fetchshopproducts , fetchshopcoupons , fetchshopdetails , fetchshoporders , createproduct , updateproduct , updateorder , couponcreate}

export default shopservice