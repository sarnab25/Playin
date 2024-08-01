import comment from "../models/comments.js"

import mongoose from "mongoose"

export const postComment = async(req,res)=>
{
    const commentData= req.body;
    const postComment = new comment(commentData);

    try {
        await postComment.save()
        res.status(200).json("Posted the comment")
    } catch (error) {
        res.status(400).json(error)
        return
    }
}

export const getComment=async(req,res)=>
{
    try{
        const commentList = await comment.find()
        res.status(200).send(commentList)
    }
    catch(error)
    {
        res.status(400).json(error)
    }
    
}

export const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid Comment ID.");
    }

    try {
        await comment.findByIdAndDelete(_id);
        res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const editComment=async(req,res)=>
{
    const {id:_id}=req.params
    const {commentbody}=req.body
    if(!mongoose.Types.ObjectId.isValid(_id))
        {
            return res.status(400).send("Comment Unavailable..")
        }

        try {
       const updateComment=    await comment.findByIdAndUpdate(_id, {$set:{"commentBody": commentbody}})
       res.status(200).json(updateComment)
        } catch (error) {
            res.status(400).json(error.messasge);
        }
}

export const getcommentVideo =async(req,res)=>
{
    const {videoId}=req.params
    if(!mongoose.Types.ObjectId.isValid(videoId))
        {
            return res.status(400).send("Invalid video Id..")
        }

        try {
            const commentList = await comment.find({videoId})
            res.status(200).send(commentList)
        } catch (error) {
            res.status(400).json(error)
        }
}