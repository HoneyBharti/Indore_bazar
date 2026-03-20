import axios from "axios"

const register=async(formdata)=>{

    const response = await axios.post("/api/auth/register" , formdata)

    localStorage.setItem("user" , JSON.stringify(response.data))
   console.log(response)
    return response.data
    
}

const login =async(formdata)=>{

    const response = await axios.post("/api/auth/login" , formdata)

    localStorage.setItem("user" , JSON.stringify(response.data))
   console.log(response)
    return response.data
    
}

const fetchmyorders =async(token)=>{

    let options ={
        headers : {
            authorization : `Bearer ${token}` 
        }
    }

    const response = await axios.get("/api/order" , options)
    return response.data

}

const ordercancel = async(token , orderdetails)=>{

      let options ={
        headers : {
            authorization : `Bearer ${token}` 
        }
    }

    const response = await axios.put(`/api/order/${orderdetails.id}`, {status : "cancelled"} , options)
    return response.data

}

const requestforshop= async(token, shopdetails)=>{

        let options ={
        headers : {
            authorization : `Bearer ${token}` 
        }
    }

    const response = await axios.post("/api/shop-owner/create-shop" , shopdetails , options)
    console.log(response.data)
    return response.data

}

const authservice = {register , login , fetchmyorders , ordercancel , requestforshop}

export default authservice