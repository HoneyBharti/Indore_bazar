import mongoose from "mongoose";

const reviewschema = new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    product:{
          type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required: true
    },
    text:{
        type : String,
        required : true
    },
    rating:{

        type : Number,
        min:[1, "Rating cannot be less than 1"],
         max:[5, "Rating cannot be greater than 5"],
        required: true
    },
    isverified:{
        type : Boolean,
        required : true,
        default : false
    }


},{
    timestamps : true
})

const Review = mongoose.model("Review" , reviewschema)

export default Review