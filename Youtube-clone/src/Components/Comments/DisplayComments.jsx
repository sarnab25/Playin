import React, { useState } from 'react'
import './Comments.css'
import { editcomment, deletecomment } from '../../actions/comment';
import { useDispatch, useSelector } from 'react-redux';
function DisplayComments({cId,commentBody, userComment}) {
  const dispatch=useDispatch()
  const [commentBdy,setCommentBdy]=useState("");
  const [ctId,setctId]=useState("");
  const currUser = useSelector(state=>state. currentUserReducer)
  const [Edit,setEdit]=useState(false)
  const handleEdit=(ctId, ctbdy)=>
    {
setEdit(true);
setctId(ctId)
setCommentBdy(ctbdy);
    }

    const handleOnSubmit=(e)=>
      {
        e.preventDefault();
        if(!commentBdy)
        {
          alert("type your comment")
        }

        else{
          dispatch(editcomment({id:ctId, commentbody:commentBdy}))
          setCommentBdy("")
        }
        setEdit(false);
      }

      const handledit=(id)=>
      {
dispatch(deletecomment(id))
      }
  return (

    
    <>

{
      Edit ? (
        <>
        <form className='comments_sub_form_comments' onSubmit={handleOnSubmit} >

        <input type="text" 
        placeholder='Edit Comment'
        className='comment_ibox' 
        value={commentBdy}
        onChange={e=>setCommentBdy(e.target.value) }/>
        <input type="submit" value="Edit" className='comment_add_btn_comments' />
      </form>
        </>):(<p className='comment_body'>{commentBody}</p>)
    }
    
    
    <p className='user_commented'>- {userComment} commented</p>
    <p className='editDel_displaycomment'>
      <i onClick={()=>handleEdit(cId, commentBody)}>Edit</i>
      <i onClick={()=>handledit(cId)}>Delete</i>
    </p>
    </>
  )
}

export default DisplayComments
