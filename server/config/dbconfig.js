import mongoose from "mongoose";

export  const connectdb = async()=>{
    try {

        let conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("success" +  conn.connection.name)
        
    } catch (error) {
        console.log("failed")
    }
}

