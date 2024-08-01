import React, { useState } from 'react';
import './VideoUploadPage.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useSelector, useDispatch } from 'react-redux';
import { uploadvideo } from '../../actions/video';

function VideoUploadPage({ setvideoUploadPage }) {
    const [title, setTitle] = useState("");
    const [videofile, setVideofile] = useState(null);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUserReducer);

    const handleSetVideofile = (e) => {
        setVideofile(e.target.files[0]);
    };

    const fileoption = {
        onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            console.log(`Uploaded: ${loaded} bytes out of ${total} bytes (${percentage}% completed)`);
            setProgress(percentage);
            if (percentage === 100) {
                setTimeout(() => {
                    setvideoUploadPage(false);
                }, 3000);
            }
        }
    };

    const uploadVideofile = () => {
        if (!title) {
            alert("Please enter a title");
        } else if (!videofile) {
            alert("Please attach a video file");
        } else if (videofile.size > 1073741824) { // 1 GB in bytes
            alert("Please attach a video file less than 1 GB");
        } else {
            const fileData = new FormData();
            fileData.append("file", videofile);
            fileData.append("title", title);
            fileData.append("channel", currentUser?.result?._id);
            fileData.append("Uploader", currentUser?.result?.name);
            
    

            dispatch(uploadvideo({ filedata: fileData, fileoption }));
        }
    };

    return (
        <div className='container_vidupload'>
            <input type="submit" name='text' value={"x"} onClick={() => setvideoUploadPage(false)} className='ibtn_x' />
            <div className="container2_vidupload">
                <div className="ibox_div_vidupload">
                    <input 
                        type="text" 
                        className="ibox_vidupload" 
                        maxLength={30} 
                        placeholder='Enter Title of Your Video'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="file" className="ibox_vidupload btn_vidupload">
                        <input 
                            type="file" 
                            name='file' 
                            className="ibox_vidupload" 
                            style={{ fontSize: "1rem" }} 
                            onChange={handleSetVideofile} 
                        />
                    </label>
                </div>
                <div className="ibox_div_vidupload">
                    <input 
                        type="submit" 
                        onClick={uploadVideofile} 
                        value={"Upload"} 
                        className="ibox_vidupload btn_vidupload" 
                    />
                    <div className="loader ibox_div_vidupload">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "20px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 255, 255, ${progress / 100})`,
                                textColor: "#f88",
                                trailColor: "#adff2f",
                                backgroundColor: "#3e98c7"
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoUploadPage;
