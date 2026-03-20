import crypto from "crypto"
import multer from "multer"
import os from "os"
import path from "path"

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null , os.tmpdir())
    },

    filename: (req,file,cb)=>{

        const extension = path.extname(file.originalname)
        cb(null , `${crypto.randomUUID()}${extension}`)
    }
})

const upload = multer({storage:storage})

export default upload
