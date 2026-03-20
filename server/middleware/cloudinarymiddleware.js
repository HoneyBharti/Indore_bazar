import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';


    // Configuration
    cloudinary.config({ 
        cloud_name: 'dgdlnlpc3', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    
   async function uploadtocloudinary(filelink) {

    try {

        const uploadresult = await cloudinary.uploader

        .upload(
            filelink,{
                resource_type: "auto"
            }
        )

        return uploadresult
        
    } catch (error) {
        fs.unlinkSync(filelink)
                console.log(error.message)

    }
    
   }

   export default uploadtocloudinary