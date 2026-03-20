import axios from "axios"


const fetchallproducts =async()=>{

    const response = await axios.get("/api/products")
    return response.data

}

const fetchallshops =async()=>{

    const response = await axios.get("/api/shops")
    return response.data

}

const fetchsingleproduct =async(pid)=>{

    const response = await axios.get(`/api/products/${pid}`)
    return response.data

}

const fetchsingleshop =async(sid)=>{

    const response = await axios.get(`/api/shops/${sid}`)
    return response.data

}




const productservice = {fetchallproducts , fetchallshops , fetchsingleproduct , fetchsingleshop}

export default productservice