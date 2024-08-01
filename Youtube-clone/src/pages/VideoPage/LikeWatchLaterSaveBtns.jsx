import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { RiHeartFill, RiPlayListAddFill, RiShareForwardLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { likevideo } from '../../actions/video';
import {addtolikedvideo,deletelikedvideo} from "../../actions/likedvideo"
import { addtowatchlater,deletewatchlater } from '../../actions/watchlater'
import { useDispatch } from 'react-redux';

import './LikeWatchLaterSaveBtns.css';

function LikeWatchLaterSaveBtns({vid}) {
  const dispatch=useDispatch()
  const [savevideo, setsavevideo] = useState(false);
  
  const [Dislikebtn, setDislikebtn] = useState(false);
  const [Likebtn, setLikebtn] = useState(false);
  const CurrentUser= useSelector(state=>state.currentUserReducer)
  const likedvideolist=useSelector((state)=>state.likedvideoreducer)
  const watchlaterlist=useSelector((s)=>s.watchlaterreducer)

  useEffect(()=>{
    likedvideolist?.data?.filter( (q)=>q.videoid ===vid._id && q.viewer ===CurrentUser.result._id
    )
    .map((m)=>setLikebtn(true));
    watchlaterlist?.data?.filter(
      (q)=>q.videoid ===vid._id && q.viewer ===CurrentUser.result._id
    )
    .map((m)=>setsavevideo(true));
  },[]);


  const handleSavevideo=()=>
    {
    

      if(CurrentUser)
      {
        if(savevideo)
          {
            setsavevideo(false);
            dispatch(deletewatchlater({videoid:vid._id,viewer:CurrentUser?.result?._id}))
          }
          else{
            setsavevideo(true);
            dispatch(addtowatchlater({videoid:vid._id,viewer:CurrentUser?.result?._id}))
          }
      }
      else{
        alert("Please Login to save video")
      }
      
    }

    const toggleLikebtn=(e,lk)=>
      {
        if(CurrentUser)
        {
          if(Likebtn)
            {
              setLikebtn(false);

              dispatch(likevideo({id:vid,Like:lk-1}))
        dispatch(deletelikedvideo({videoid:vid._id,viewer:CurrentUser?.result?._id}))
            }
            else{
              setLikebtn(true);
              dispatch(likevideo({id:vid,Like:lk+1}))
        dispatch(addtolikedvideo({videoid:vid._id,viewer:CurrentUser?.result?._id}))
        setDislikebtn(false);
            }
        }
        else
        {
          alert("Login to Like")
        }
        
      }

      const toggleDislikebtn=(e,lk)=>
        {
          if(CurrentUser)
          {
            if(Dislikebtn)
              {
                setDislikebtn(false);
              }
              else{
                setDislikebtn(true);
                if(Likebtn){
                  dispatch(likevideo({id:vid._id,Like:lk-1}))
                  dispatch(deletelikedvideo({videoid:vid._id,viewer:CurrentUser?.result?._id}))
                }
                setLikebtn(false)
              }
          }
          else
          {
            alert("Login to dislike")
          }
          
        }
  return (
    <div className='btns_cont_videopage'>
      <div className="btn_videopage">
        <BsThreeDots />
      </div>

      <div className="like_videopage">
      <div className="btn_videopage" onClick={(e)=>toggleLikebtn(e, vid.like)}>
          {Likebtn ? (
            <AiFillLike size={22} className='btns_videopage' />
          ) : (
            <AiOutlineLike size={22} className='btns_videopage' />
          )}
          <b> {vid.like}</b>
        </div>

        <div className="btn_videopage" onClick={(e)=>toggleDislikebtn(e, vid.like)}>
          {Dislikebtn ? (
            <AiFillDislike size={22} className='btns_videopage' />
          ) : (
            <AiOutlineDislike size={22} className='btns_videopage' />
          )}
          <b>Dislike</b>
        </div>

        <div className="btn_videopage" onClick={()=>handleSavevideo()}>
          {savevideo ? (
            <>
              <MdPlaylistAddCheck size={22} className='btns_videopage' />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className='btns_videopage' />
              <b>Save</b>
            </>
          )}
        </div>

        <div className="like_videopage">
          <>
            <RiHeartFill size={22} className='btns_videopage' />
            <b>Thanks</b>
          </>
        </div>

        <div className="like_videopage">
          <>
            <RiShareForwardLine size={22} className='btns_videopage' />
            <b>Share</b>
          </>
        </div>
        
      </div>
    </div>
  );
}

export default LikeWatchLaterSaveBtns;
