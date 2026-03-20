import axios from "axios"

const addtocart =async(token , cartItems)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post("/api/cart" , cartItems, options)
    return response.data

}

const fetchcart =async(token)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get("/api/cart" , options)
    return response.data

}


const removecart =async(token , pid)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete(`/api/cart/${pid}` , options)
    return response.data

}

const cartupdate =async(token , cartDetails)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.put(`/api/cart/${cartDetails.cid}`,cartDetails , options)
    return response.data

}

const ordercreate =async(token , couponcode)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post("/api/order",couponcode , options)
    return response.data

}



const cartservice = {addtocart  , fetchcart , removecart , cartupdate , ordercreate}

export default cartservice