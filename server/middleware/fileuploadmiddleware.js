import multer from "multer"

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null , 'uploads/')
    },

    filename: (req,file,cb)=>{

        const extension = file.originalname.split(".")[1]
        cb(null , crypto.randomUUID() + "." + extension)
    }
})

const upload = multer({storage:storage})

export default upload