import videofile from "../models/videofile.js";
import mongoose from 'mongoose'

export const likevideoController =async(req,res)=>
{
    const {id:_id}=req.params;
    const {Like}=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send("Video Unavailable")
    }

    try{
        const updateLike=await videofile.findByIdAndUpdate(_id, {$set:{"Like":Like}})
        res.status(200).json(updateLike)
    }
    catch(error)
    {
        res.status(400).json("error", error)
    }
}