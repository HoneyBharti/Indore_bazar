import mongoose from "mongoose";


const userschema = new mongoose.Schema({
    name : {
        type : String,
        required: [true , "Please Fill Name"]
    },
    email:{
        type : String,
        unique : true,
        required: [true , "Please Fill Email"]
    },
    phone:{
        type : String,
        unique : true,
        required: [true , "Please Fill Phone"]
    },
     address: {
        type: String,
        required: [true, "Please Fill Address"]
    },
    password:{
        type : String,
        required: [true , "Please Fill Password"]
    },
    isShopowner:{
        type : Boolean,
        default : false,
        required: true
    },
    isAdmin :{
         type : Boolean,
         default : false,
        required: true
    },
    isActive:{
         type : Boolean,
         default:  true ,
        required: true
    }
},{
    timestamps: true
})

const User = mongoose.model("User" , userschema)

export default User 