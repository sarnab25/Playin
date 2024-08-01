import mongoose from "mongoose"

const resolutionSchema =new mongoose.Schema({

    resolution:
    {
        type:String,
        required:true,
    },

    filepath:
    {
        type:String,
        required:true,
    },

    video:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Videofile',
        required:true,
    },
    
    
},
{
    timestamps:true
});

export default mongoose.model("Resolution", resolutionSchema)