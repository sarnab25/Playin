"use strict";
import multer, { diskStorage } from "multer";
const storage=diskStorage({
    destination:(req,res,cb)=>
    {
        cb(null,"uploads/original");
    },

    filename:(req,file,cb)=>
    {

        cb(null, new Date().toISOString().replace(/:/g,"-")+"-"+file.originalname);
    }
});

const fileFilter=(req,file,cb)=>
{
    if(file.mimetype.toLowerCase()==="video/mp4")
    {
        cb(null,true)
    }
    else
    {
        cb(null,false)
    }
}
const upload=multer({storage:storage, fileFilter:fileFilter});
export default upload