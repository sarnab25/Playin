import mongoose from 'mongoose'
const videofileSchema=new mongoose.Schema({

    videotitle:
    {
        type:String,
        required:true,
    },

    filename:
    {
        type:String,
        required:true,
    },

    filetype:
    {
        type:String,
        required:true,
    },

    filepath:
    {
        type:String,
        required:true,
    },

    filesize:
    {
        type:String,
        required:true,
    },

    videochannel:
    {
        type:String,
        required:true,
    },

    like:
    {
        type:Number,
        default:0,
    },

    views:
    {
        type:Number,
        default:0,
    },

    Uploader:
    {
        type:String
    },

    resolutions: {
        type: Map,
        of: String,
        required: false,
      },

  
},

{
    timestamps:true
   }

)

export default mongoose.model('Videofile', videofileSchema);