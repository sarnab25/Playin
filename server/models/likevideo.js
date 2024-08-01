import mongoose from "mongoose"
const likedvideoschema=new mongoose.Schema({
    videoid:
    {
        
        type:String,
        required:true,
    },
    viewer:
    {
        type:String,
        required:true,
    },

    likedon:
    {
        type:Date,
        default:Date.now,
    },
})
export default mongoose.model("Likedvideo",likedvideoschema)