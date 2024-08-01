import { useLocation } from 'react-router-dom'
import  './CustomVideoplayer.css'
import { useEffect, useRef, useState } from 'react';
import { GetLocation } from '../../Utils/GetLocation';
import { GetTemperature } from '../../Utils/GetTemperature';
import Popup from '../Popup/Popup';
import { useSelector } from 'react-redux';
import { getallVideo } from '../../actions/video';
import { useDispatch } from 'react-redux';
import PopComment from "../Popup/PopComment/PopComment"
import axios from 'axios';
export default function CustomVideoplayer()
{
    const dispatch = useDispatch();
    const location =useLocation();
  const params=new URLSearchParams(location.search)
  const vid=JSON.parse(params.get('vid'));
  const [currVid,setcurrVid]=useState(vid);
    const [play, setplay]=useState(false);
    const [showPopup,setshowPopup]=useState(false);
    const [locationData, setlocationData]=useState(null);
    const [fastForward, setfastForward]=useState(false)
    const [slowdown , setslowdown]=useState(false)
    const [tempData, settempData]=useState(null);
    const [click, setclick]=useState(0);
    const videoRef=useRef(null);
    const clickTimeRef=useRef(null);
    const [commentPop, setcommentPop]=useState(false);
    const [Comment, setComment]=useState([]);

    
    
const videolists =useSelector(state=>state.videoReducer.data);

useEffect(()=>
{
    dispatch(getallVideo())
}, [dispatch]);

    useEffect(()=>
    {
        if(videoRef.current)
        {
            videoRef.current.playbackRate= fastForward? 2 : 1;
        }
    }, [fastForward]);

    useEffect(()=>
        {
            if(videoRef.current)
            {
                videoRef.current.playbackRate= slowdown? 0.5 : 1;
            }
        }, [slowdown]);

    const handleSingleClick =()=>
    {
        if(videoRef.current)
            {
    
            
            if(play)
            {
                videoRef.current.pause();
            }
    
            else{
                videoRef.current.play()
            }
            setplay(!play);
        }
    }

    const handleRightDoubleClick =()=>
    {
        if(videoRef.current)
        {
       videoRef.current.currentTime +=10;
        }
    }

    const handleLeftDoubleClick =()=>
    {
        if(videoRef.current)
            {
           videoRef.current.currentTime -=10;
            }
    }

    const handleCornerClick =async()=>
    {
        const location = await GetLocation();
        const temp=await GetTemperature();
        settempData(temp);
        setshowPopup(true);
        setlocationData(location);
    }

    const closePopup =()=>
    {
        setshowPopup(false);
    }

    const handleMouseDown=()=>
    {
        setfastForward(true);
    }

    const handleMouseUp =()=>
    {
        setfastForward(false);
    }
    
    const handleLeftMouseDown =()=>
    {
        setslowdown(true);
    }
    const handleLeftMouseUp =()=>
    {
        setslowdown(false);
    }

     const handleTrippleClickR =()=>
     {
setclick(prevClick=>prevClick+1);

clearTimeout(clickTimeRef.current)

clickTimeRef.current=setTimeout(()=>{
    setclick(0)
},5000);

if(click===2)
{
    const closeWindow =window.confirm("Do you want to close the window")
    if(closeWindow)
    {
        window.close();
    }
    
}

     } 

     const handleTrippleClickM =()=>
     {
        setclick(prevClick=>prevClick+1);

clearTimeout(clickTimeRef.current)

clickTimeRef.current=setTimeout(()=>{
    setclick(0)
},5000);

        if(click===1)
        {
           console.log("tripple click trigered")
const currIdx = videolists.findIndex(videolist=> videolist._id===currVid._id)
const nextIdx= (currIdx+1)%videolists.length;
setcurrVid(videolists[nextIdx]);
setclick(0);
        }
     }

     const handleTrippleClickL =async()=>
     {
        setclick(prevClick=>prevClick+1);

clearTimeout(clickTimeRef.current)

clickTimeRef.current=setTimeout(()=>{
    setclick(0)
},5000);

        if(click===2)
        {
            const res=await axios.get(`https://playin.onrender.com/comment/${currVid._id}`).then(res=>
            {
                setComment(res.data)
                setcommentPop(true);
            }
            ).catch(err=>console.log(err))
          
            
        }
     }

     const handleClose=()=>
     {
        setcommentPop(false);
     }
    return ( 
    <>
        <div className="video_container">
<video ref= {videoRef} className= "video_element" src={`https://playin.onrender.com/${currVid.filepath}`}></video>
            <div className=" overlay middle" onClick={handleSingleClick} onDoubleClick={handleTrippleClickM}></div>

            <div className=" overlay right" 
            onDoubleClick={handleRightDoubleClick} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} onClick={handleTrippleClickR}>
            </div>

            <div className=" overlay left" 
            onDoubleClick={handleLeftDoubleClick} 
            onMouseDown={handleLeftMouseDown} 
            onMouseUp={handleLeftMouseUp}
            onClick={handleTrippleClickL}>
            </div>

            <div className=" overlay right_corner" 
            onClick={handleCornerClick}>

            </div>
            {
                    showPopup && <Popup location ={locationData}  temperature={tempData} onClose ={closePopup}/>
                   
         }

         {
           commentPop && <PopComment comment={Comment} onClose={handleClose}/>
         }

        </div>
        </>
    )
}