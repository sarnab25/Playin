import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './VideoPage.css';
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../Components/Comments/Comments';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import moment from "moment"
import { viewsvideo } from '../../actions/video';
import { addtohistory } from '../../actions/history'
import { useDispatch } from 'react-redux';
import videofile from '../../../../server/models/videofile';

function VideoPage() {
    const dispatch=useDispatch()
    const location = useLocation();
    const { state } = location; 
    const vid = state?.vid || {};
    const currentUser = useSelector(state => state.currentUserReducer);    
    const [resolution, setResolution]=useState('720p')


    
    
    if (!vid) {
        return <div>Video not found</div>;
    }
    console.log(vid)


    const getvideoResolution =(resolution)=>
    {
       return vid.resolutions?.[resolution]
    }

    const openCustomplayer=()=>
    {
        const url=`/customvideoplayer/${vid._id}`
        const params= new URLSearchParams();
        params.append('vid', JSON.stringify(vid))
        const newurl= `${url}?${params.toString()}`

        window.open(newurl, '_blank' , 'noopener,noreferrer')
    }

    const handleviews=()=>{
        dispatch(viewsvideo({id:vid._id}))
    }
    const handlehistory=()=>{
        dispatch(addtohistory({
            videoid:vid,
            viewer:currentUser?.result._id,
        }))
    }
    useEffect(()=>{
        if(currentUser){
            handlehistory();
        }
        handleviews()
    },[])
    
    return (
        <div className="container_videopage">
            <div className="container2_videopage">
                <div className="video_display_screen_videopage">
                    <video src={`http://localhost:4040/${getvideoResolution(resolution)}`} className="video_showvideo_videopage" controls></video>
                    <div className="video_details_videopage">
                        
                        <div className="customvideoplayer" onClick={openCustomplayer}>
                            Custom Video Player
                        </div>
                        
                        <div className="resolution_selector" style={{textAlign:"center" , fontFamily:"sans-serif" , fontWeight:"bolder"}}>
                            <label htmlFor="resolution">Resolution:</label>
                            <select  id="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                <option value="320p">320p</option>
                                <option value="480p">480p</option>
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                            </select>
                        </div>
                        <div className="video_btns_title_videopage_cont">
                            <p className="video_title_videopage">{vid.videotitle}</p>
                            <div className="views_date_btns_videopage">
                                <div className="views_videopage">
                                    {vid.views} <div className="dot"></div> {moment(vid.createdat).fromNow()}
                                </div>
                                <LikeWatchLaterSaveBtns  vid={vid}/>
                            </div>
                        </div>
                        <div className="chanel_details_videopage">
                            <b className="chanel_logo_videopage">
                                <p>{vid?.Uploader?.charAt(0).toUpperCase()}</p>
                            </b>
                            <p className="chanel_name_videopage">{vid.Uploader}</p>
                        </div>
                        <div className="comments_videopage">
                            <h2>
                                <u>Comments</u>
                               
                            </h2>
                            <Comments vid={vid}/>
                        </div>
                    </div>
                </div>
                <div className="more_videobar">
                    More Video
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
