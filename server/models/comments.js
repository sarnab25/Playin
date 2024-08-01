import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    videoId:
    {
        type:String,
    },

    userId:
    {
        type:String,
    },

    commentBody:
    {
        type:String,
    },

    userCommented:
    {
type:String,
    },

    videoId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Videofile',
        required:true,
    },

    commentedOn:
    {
        type:Date,
        default:Date.now,
    }
})

export default mongoose.model("Comment", commentSchema);