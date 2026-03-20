import jwt from "jsonwebtoken"
import User from "../models/usermodel.js"
const authprotect =async(req,res,next)=>{
    try {

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select("-password")

            if(!user){

                res.status(400)
                throw new Error("You are not authorized")
            }

            req.user = user
            next()
        }

              else{

               res.status(400)
                throw new Error("You are not authorized")
            
          }
        
    } catch (error) {
        res.status(400)
        throw new Error('you are not authorized')
    }
}


const adminprotect =async(req,res,next)=>{
    try {

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select("-password")

            if(!user){

                res.status(400)
                throw new Error("You are not authorized")
            }

            

            if(user.isAdmin){
                req.user = user
                  next()
            }
          else{

               res.status(400)
                throw new Error("You are not authorized")
            
          }
        }
        
    } catch (error) {
        res.status(400)
        throw new Error('you are not authorized')
    }
}
const protect ={ adminprotect , authprotect}

export default protect