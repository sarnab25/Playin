import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar"
import "./Home.css"
import ShowVideoGrid  from '../../Components/ShowVideoGrid/ShowVideoGrid'
import { useSelector } from "react-redux"


import { GetLocation } from '../../Utils/GetLocation'
import { GetTime } from "../../Utils/GetTime"
import { useEffect } from "react"
import { useState } from "react"



export default function Home()
{

    const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q).reverse();

    const NavList =[
        "All",
        "Python",
        "java",
        "C++",
        "Movies",
        "Science",
        "Animation",
        "Gaming",
        "Comedy",
        "Calesthanics",
        "Attack on titan",
        "Caligrahy",
        "Sketching",
        "TechBurner",
        "CodewithHarry",
        "Ezsniphet",
        "Motor-Mouth",
        "Horror",
"Anatoly",
"Chris Heria"
    ]

    const southStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];


    const [isAccess, setIsAccess] = useState(true);
  const [color, setColor] = useState('dark');
  
  useEffect(()=>
{
    const initialize = async () => {
        const location = await GetLocation();
        const currTime = await GetTime();


        if (currTime.getHours() >= 13 && currTime.getHours() < 14) {
            setIsAccess(false);
            return;
        }

        const userState = location ? location.region : '';
        if (currTime.getHours() >= 10 && currTime.getHours() < 12 && southStates.includes(userState)) {
            setColor('light');
        } else {
            setColor('dark');
        }

        
}
    initialize();
}, []);

    


    if (!isAccess) {

        return <div 
        style={{fontWeight:"bolder",  
            display:"flex",textAlign:"center" , 
            alignItems:"center", 
            height:"80vh", 
            justifyContent:"center",
            flexDirection:"column",
            fontSize:"5vh"}}>
                <div style={{fontSize: "30vh"}}>
                    😞
                    </div>
                    <div>
                    Website is under maintenance from 1 PM to 2 PM. Please try again after 2 PM.
                    </div>
                    </div>; 
    }

    return (

        
    
        <div className={`container_pages_app ${color === 'light' ? 'light-theme' : 'dark-theme'}`} >
            <Leftsidebar/>
             <div className="container2_pages_app">
                
                <div className="navigation_home">
                    {

                        NavList.map(m=>
                            {
                                return(
                                    <p key={m} className="btn_nav_home">{m}</p>
                                )
                            }
                        )
                    }
                </div>

                {}
<ShowVideoGrid vids={vids}/>
             </div>
        
         </div>
        
    )
}