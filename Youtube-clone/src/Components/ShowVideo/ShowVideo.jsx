import './ShowVideo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePoints } from '../../actions/userpoints';
import { useEffect, useRef } from 'react';
import moment from "moment"
export default function ShowVideo({ vid }) {
    const dispatch = useDispatch();
   const videoRef=useRef(null)
    const handleClick =()=>
    {
        dispatch(updatePoints(5));
    }

    useEffect(() => {
        if (videoRef.current) {
          console.log('Video element:', videoRef.current);
          console.log('Video source:', vid);
        }
      }, [vid]);
    
    return (
        <>
            <div>
                <video ref={videoRef} src={`https://playin.onrender.com/${vid.filepath}`} className="video_showvideo" />
                <Link to={`/videopage/${vid._id}`} 
                    state={{ vid }} onClick={handleClick}>
                        
                    <div className="play">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </Link>
            </div>
            <div className="video_description">
                <div className="chanel_logo_app">
                    <div className="fstChar_logo_app">
                        {vid?.Uploader?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="video_details">
                    <p className='title_vid_showvideo'>{vid.videotitle}</p>
                    <pre className='vid_view_uploadtime'>{vid.Uploader}</pre>
                    <pre className='vid_view_uploadtime'>
                        {vid.views} <div className="dot"> </div> {moment(vid.createdat).fromNow()}
                    </pre>
                </div>
            </div>
        </>
    )
}
