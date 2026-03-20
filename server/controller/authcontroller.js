import bcrypt, { genSaltSync } from "bcryptjs"
import User from "../models/usermodel.js"
import jwt from "jsonwebtoken"

const registeruser =async(req,res)=>{

    const {name , email , phone , password , address} = req.body


    if(!name || !email || !phone || !password || !address){
        res.status(409)
       throw new Error('Please fill all details')
    }


    const emailexist = await User.findOne({email})
        const phoneexist = await User.findOne({phone})

        if(emailexist || phoneexist){
             res.status(409)
       throw new Error('User already exist')
        }

        if(phone.length !== 10){
            res.status(409)
            throw new  Error("Enter valid phone number")
        }


        const salt = bcrypt.genSaltSync(10)
        const hashedpassword = bcrypt.hashSync(password , salt)


        const user = await User.create({
            name , email , password : hashedpassword , phone , address
        })


        if(!user){
            res.status(409)
            throw new Error("user not created")
        }

        res.status(200).json({
            _id : user._id ,
            name : user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin : user.isAdmin ,
            isShopowner : user.isShopowner,
            isActive: user.isActive,
             token: generatetoken(user._id)

        })
}


const loginuser =async(req,res)=>{

        const { email , password } = req.body


    if(!email || !password ){
        res.status(409)
       throw new Error('Please fill all details')
    }

    const user = await User.findOne({email})


    if(user && await bcrypt.compare(password , user.password)){
  res.status(200).json({
            _id : user._id ,
            name : user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin : user.isAdmin ,
            isShopowner : user.isShopowner,
            isActive: user.isActive,
            token: generatetoken(user._id)
        })
    }

    else{
        res.status(400)
        throw new Error('invalid credentials ')
    }

}


const privateaccess =(req , res)=>{

    res.json({
        message: `Request is made by ${req?.user?.name}`
    })

}


const generatetoken=(id)=>{
 const token = jwt.sign({id} , process.env.JWT_SECRET, {expiresIn: '30d'})
return token
}


const authcontroller ={registeruser , loginuser , privateaccess}

export default authcontroller