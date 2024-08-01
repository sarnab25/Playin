import Navbar from "./Components/Navbar/Navbar"
import "./App.css"
import React, { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


import Allroutes from "./Components/Allroutes";
import Drawersidebar from "./Components/Leftsidebar/Drawersidebar";
import CreateEditchannel from "./pages/Channel/CreateEditchannel";
import VideoUploadPage from "./pages/VideoUploadPage/VideoUploadPage";
import { fetchallChannel } from "./actions/channeluser";
import { getallVideo } from "./actions/video";
import { getallcomment } from "./actions/comment";
import { getallhistory } from "./actions/history";
import { getalllikedvideo } from "./actions/likedvideo";
import { getallwatchlater } from "./actions/watchlater";

function App() {
  const [toggleDrawerSidebar, settoggleDrawerSidebar]=useState({
    display:"none",

  })

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchallChannel())
    dispatch(getallVideo())
    dispatch(getallcomment())
    dispatch(getallhistory())
    dispatch(getalllikedvideo())
    dispatch(getallwatchlater())
  },[dispatch])
  const [EditCreateChannelbtn, setEditCreateChannelbtn]=useState(false);
  const [videoUploadPage,setvideoUploadPage]=useState(false);
  const toggleDrawer =()=>
    {
      if(toggleDrawerSidebar.display==="none")
        {
          settoggleDrawerSidebar({display:"flex"})
        }
        else{
          settoggleDrawerSidebar({display:"none"})
        }
    }
   

  return (
    <>
    <Router>
      {
        videoUploadPage && (
          <VideoUploadPage setvideoUploadPage={setvideoUploadPage}/>
        )
      }
      {EditCreateChannelbtn && (
        <CreateEditchannel setEditCreateChannelbtn={setEditCreateChannelbtn}/>
      )}
      <Navbar
      toggleDrawer={toggleDrawer} setEditCreateChannelbtn={setEditCreateChannelbtn}/>
      {
        <Drawersidebar
        toggleDrawer={toggleDrawer}
        toggleDrawerSidebar={toggleDrawerSidebar}/>
      }
      <Allroutes  setEditCreateChannelbtn={setEditCreateChannelbtn} setvideoUploadPage={setvideoUploadPage}/>
      </Router>
    </>
  )
}

export default App
