import mongoose from "mongoose";

const couponschema = new mongoose.Schema({

    couponcode : {
        type : String,
        required : [true , "Please enter coupon code"]
    },
    coupondiscount:{
        type : Number,
        required : [true, "please enter rate of discount"]
    },

    isActive:{
        type : Boolean,
        required:true,
        default:true
    },

    shop:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    }

},{
    timestamps : true
})

const Coupon = mongoose.model("Coupon" , couponschema)

export default Coupon