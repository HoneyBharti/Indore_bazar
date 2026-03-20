import axios from "axios"

const fetchallusers=async(token)=>{

    let options ={
headers:{
    authorization : `Bearer ${token}`
}
    }

    const response = await axios.get("/api/admin/users" , options)

    return response.data
}


const fetchallorders=async(token)=>{

    let options ={
headers:{
    authorization : `Bearer ${token}`
}
    }

    const response = await axios.get("/api/admin/orders" , options)

    return response.data
}


const fetchallshops =async(token)=>{

    let options ={
headers:{
    authorization : `Bearer ${token}`
}
    }

    const response = await axios.get("/api/admin/shops" , options)

    return response.data
}


const updateshop = async(shopdetails , token)=>{

     let options ={
headers:{
    authorization : `Bearer ${token}`

}
     }

     const response = await axios.put(`/api/admin/shops/${shopdetails.shopid}` ,shopdetails, options)
     return response.data
}


const updateuser = async(userdetails , token)=>{

     let options ={
headers:{
    authorization : `Bearer ${token}`

}
     }

     const response = await axios.put(`/api/admin/users/${userdetails.userid}` ,userdetails, options)
     return response.data
}

const adminservice = {fetchallusers , fetchallorders , fetchallshops ,updateshop , updateuser}

export default adminservice