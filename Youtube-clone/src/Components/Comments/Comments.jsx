import React, { useState } from 'react'
import './Comments.css'
import DisplayComments from './DisplayComments';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postcomment } from '../../actions/comment';

function Comments({vid}) {
    const [comment,setComment]=useState("");
    const handleOnSubmit =(e)=>
        {
            e.preventDefault();

            if(CurrUser)
            {
                if(!comment)
                {
                    alert("please type your comment")
                }

                else{
                    dispatch(postcomment({
                        videoId:vid._id,
                        userId:CurrUser?.result._id,
                        commentBody:comment,
                        userCommented:CurrUser.result.name
                    }))
                    setComment("")
                }
            }

            else{
                alert("Please login to comment")
            }
        }

        const dispatch=useDispatch();
     
     const CurrUser =useSelector(state=>state.currentUserReducer)
        const commentList = useSelector(state=>state.commentReducer.data)
        // const commentList =[
        //     {
        //         _id:1,
        //         commentBody:"he waves are awesome",
        //         userComment:"abc"
        //     },
        //     {
        //         _id:2,
        //         commentBody:"he waves are awesome",
        //         userComment:"xyz"
        //     },
        //     {
        //         _id:3,
        //         commentBody:"he waves are awesome",
        //         userComment:"pqr"
        //     },
        // ]

  return (
    <div>
      <form className='comments_sub_form_comments' onSubmit={handleOnSubmit}>
        <input type="text" placeholder='Add Comment'className='comment_ibox' onChange={e=>setComment(e.target.value)} value={comment}/>
        <input type="submit" value="Add" className='comment_add_btn_comments' />
      </form>
<div className="display_comment_container">
    {
        commentList?.filter((q)=>vid._id===q?.videoId).map(m=>{
            return(
<DisplayComments userComment={m.userComment} commentBody={m.commentBody} cId={m._id}/>
            )
        })
    }
    
</div>
    </div>
  )
}

export default Comments
