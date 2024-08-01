import React from 'react';
import Home from "../pages/Home/Home";
import { Routes,Route,Link } from "react-router-dom";
import Library from '../pages/Library/Library'
import YourVideo from '../pages/YourVideo/YourVideo';
import WatchHistory from '../pages/WatchHistory/WatchHistory'
import Channel from '../pages/Channel/Channel';
import WatchLater from '../pages/WatchLater/WatchLater';
import LikedVideos from '../pages/LikedVideos/LikedVideos';
import VideoPage from '../pages/VideoPage/VideoPage';
import CustomVideoplayer from './CustomVideoplayer/CustomVideoplayer';
import Search from "../pages/Search/Search"

export default function Allroutes({setEditCreateChannelbtn, setvideoUploadPage}) {
  return (
    <Routes>
        <Route path='/' element={ <Home/>}/>
  <Route path= '/library' element={ <Library/>}/>
  <Route path= '/yourvideo' element={<YourVideo/>}/>
  <Route path= '/history' element={ <WatchHistory/>}/>
  <Route path= '/watchlater' element={ <WatchLater/>}/>
  <Route path= '/likedvideos' element={ <LikedVideos/>}/>
  <Route path= '/videopage/:id' element={ <VideoPage/>}/>
  <Route path='/customvideoplayer/:id' element={<CustomVideoplayer/>}/>
  <Route path='/channel/:id' element={<Channel setEditCreateChannelbtn={setEditCreateChannelbtn} setvideoUploadPage={setvideoUploadPage}/>}/>
  <Route path='/search/:searchquery' element={<Search/>}/>
      </Routes>
  );
}

