import { MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater } from "react-icons/md";
import "./Leftsidebar.css";
import {AiFillLike, AiFillPlaySquare, AiOutlineHome} from "react-icons/ai"
import {FaHistory} from "react-icons/fa"
import { NavLink } from "react-router-dom";
export default function Drawersidebar({toggleDrawer, toggleDrawerSidebar})

{
    return(
        <div className="container_drawerleftsidebar" style={toggleDrawerSidebar}>
            <div className="container2_drawerleftsidebar">
                <div className="drawer_leftsidebar">
                    <NavLink to={'/'}  className="icon_sidebar_div">
                        <p>
<AiOutlineHome
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Home</div>
                        </p>

                

                    </NavLink>

                    <div className="icon_sidebar_div">
                        <p>
<MdOutlineExplore
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Explore</div>
                        </p>

                

                    </div>

                    <div className="icon_sidebar_div">
                        <p>
<MdOutlineExplore
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Shorts</div>
                        </p>

                

                    </div>

                    <div className="icon_sidebar_div">
                        <p>
<MdOutlineSubscriptions
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Subscriptions</div>
                        </p>

                

                    </div>
                </div>
<div className="libraryBtn_drawerleftsidebar">
<NavLink to ="/library" className="icon_sidebar_div">
                        <p>
<MdOutlineVideoLibrary
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Library</div>
                        </p>

                

                    </NavLink>

                    <NavLink to={'/history'} className="icon_sidebar_div">
                        <p>
<FaHistory
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">History</div>
                        </p>

                

                    </NavLink>

                    <NavLink to ={'/yourvideo'} className="icon_sidebar_div">
                        <p>
<AiFillPlaySquare
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Videos</div>
                        </p>

                

                    </NavLink>

                    <NavLink to ={'/watchlater'} className="icon_sidebar_div">
                        <p>
<MdOutlineWatchLater
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Watch Later</div>
                        </p>

                

                    </NavLink>

                    <NavLink to={'/likedvideos'} className="icon_sidebar_div">
                        <p>
<AiFillLike
size={22} className={"icon_sidebar"} style={{margin:"auto 0.7rem"}}/>
<div className="text_sidebar_icon">Liked Videos</div>
                        </p>

                

                    </NavLink>
</div>
<div className="subscription_lsdbar">
    <h3>Subscritions</h3>
    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>

    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>

    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>

    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>

    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>
    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>
    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>

    <div className="chanel_lsdbar">
        <p>C</p>
        <div>Chanel</div>
    </div>
   
</div>
                </div>

                <div className="container3_drawerleftsidebar" onClick={()=>toggleDrawer()}>

                </div>

            
        </div>
        
    )
}