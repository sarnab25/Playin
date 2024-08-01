import "./Navbar.css";
import logo from "./logo.png";
import Searchbar from "./Searchbar/Searchbar";
import {RiVideoAddLine} from "react-icons/ri"
import { RiNotificationLine } from 'react-icons/ri'
import {BiUserCircle} from "react-icons/bi"
import {GoogleLogin} from 'react-google-login'
import {gapi} from "gapi-script"
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../../actions/auth"
import Auth from "../../pages/Auth/Auth"
import { GetTime } from "../../Utils/GetTime"
import { GetLocation } from "../../Utils/GetLocation";
import PopOTp from "../Popup/PopOTP/PopOTp";
import axios from  "axios"
import { FaVideo } from "react-icons/fa";
import VideocallFeature from "../../pages/VideocallFeature/VideocallFeature";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";

// import {IoMdNotificationOutline} from "react-icons/io"



export default function Navbar({toggleDrawer , setEditCreateChannelbtn}) {

  const [AuthBtn,setAuthBtn]=useState(false);
  const [isAccess, setIsAccess] = useState(true);
  const [VoIP, setVoIP]=useState(false)
  const [isSouth, setisSouth]=useState(false);
const [otpPop, setotpPop]=useState(false)
const [phoneNumber, setphoneNumber]=useState("")
const [otp, setotp]=useState("")
const [verificationId, setVerificationId]= useState(null);
  const southStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];
  
const CurrentUser= useSelector(state=>state.currentUserReducer)
console.log(CurrentUser)
    useEffect(()=>
    {
      function start()
      {
        gapi.client.init({
          clientId: "1041837286930-spcmbvu53mjjpo2qlvo4bf67mtvkqvob.apps.googleusercontent.com",
          scope: "email"
        })
      }
      gapi.load("client:auth2", start);

      const initialize = async () => {
       
      
        const currTime = await GetTime();
        const location = await GetLocation();

        const userState = location ? location.region : '';
        setisSouth(southStates.includes(userState));
        if (currTime.getHours() >= 13 && currTime.getHours() < 14) {
            setIsAccess(false);
            return;
        }}
initialize();
      
    },
  [])

  
  

  const dispatch= useDispatch();

    const onSuccess = async(response)=>
      {
        const Email= response?.profileObj.email;
        console.log(Email)
        dispatch(login({email:Email}))

        if(!isSouth)
        {
          setotpPop(true)
        }

        else{
          await axios.post('http://localhost:4040/send/email', {email:Email})
        }

      }

      const onFailure =(response)=>
        {
          console.log("Failure", response);
        }


        // const firebaseConfig = {
        //   apiKey: import.meta.env.VITE_FIRE_API,
        //   authDomain: import.meta.env.VITE_FIRE_AUTH,
        //   projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
        //   storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
        //   messagingSenderId: import.meta.env.VITE_FIRE_MESSAGE_ID,
        //   appId: import.meta.env.VITE_FIRE_APP,
        //   measurementId: import.meta.env.VITE_FIRE_MEASUREMENT_ID
        // };
        
        // const app=initializeApp(firebaseConfig)
        // const  auth =getAuth(app)
        
        const handlePhoneSubmit = async () => {
        
        
          try {
            // const recaptchaVerifier = new RecaptchaVerifier(
            //   'recaptcha-container',
            //   {
            //     size: 'invisible', // Or 'normal' if you want a visible reCAPTCHA
            //     callback: (response) => {
            //       console.log('Recaptcha Verified');
            //     },
            //     'expired-callback': () => {
            //       console.log('Recaptcha expired');
            //     },
            //   },
            //   auth
            // );

            // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            // setVerificationId(confirmationResult.verificationId);

            console.log(`Sending OTP to phone number ${phoneNumber}`);
            const response = await axios.post('http://localhost:4040/send/number', { phoneNumber });
            console.log('OTP response', response.data);
            
          } 
          
        
         catch (error) {
            console.error('Error Sending OTP', error.message);
            alert(" Number needs to be Registered in twilio first for the verification to proceed")
          }
        };
        
        
        const handleotpSubmit =async()=>
        {

          
          try {

            const identifier = isSouth ? CurrentUser?.result.email : phoneNumber;
            console.log('CurrentUser:', CurrentUser);
            console.log('PhoneNumber:', phoneNumber);
            console.log('Using Identifier:', identifier);
            
            if (!identifier) {
              alert('Identifier is not set. Please check your input.');
              return;
            }
        
            const isValid= await axios.post('http://localhost:4040/verify/otp', {identifier,otp})
          
            if(isValid.data.success)
            {
              setotpPop(false)
              alert("OTP verified")
              setphoneNumber('');
            }
  
            else{
              alert("Redis client connecting but the set method is not working, Not able to configure the error")
            }
          } catch (error) {
            console.error("Error Verifyig OTP", error.message)
          }
        
        }
        
        if (!isAccess) {

          return <div className="maintenance-message"></div>; 
      }

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Container">
          <div className="burger" onClick={()=>toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className="logo_div_Navbar">
            <img src={logo} alt="" />
            <p className="logo_title_navbar">Playon</p>
          </div>

        </div>
        <Searchbar />
        <FaVideo className={"vid_bull_Navbar"} onClick={()=>setVoIP(true)}/>
        {/* <MdVideocam/> */}
        <RiVideoAddLine size={22} className={"vid_bull_Navbar"}/>
        <div className="app_box">
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
            <p className="appBox"></p>
        </div>
        {/* <IoMdNotificationOutline className={" vid_bull_Navbar"}/> */}
        <RiNotificationLine className={"vid_bull_Navbar"}/>
        <div className="Auth_cont_Navbar">
            
                {CurrentUser? (
                    <>
                    <div className="chanel_logo_app" onClick={()=>setAuthBtn(true)}>
                        <p className="fstChar_logo_app">
                            {CurrentUser?.result.name?
                            (<>
                            {CurrentUser?.result.name.charAt(0).toUpperCase()}
                            </>):
                            (<>
                              {CurrentUser?.result.email.charAt(0).toUpperCase()}
                            </>)

                            }
                        </p>
                    </div>
                    </>
                ):(
                    <>
                    <GoogleLogin
                    
                    clientId="1041837286930-spcmbvu53mjjpo2qlvo4bf67mtvkqvob.apps.googleusercontent.com"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    render={(renderProps)=>(
                      <p onClick={renderProps.onClick} className="Auth_button">
                      <BiUserCircle size={22}/>
                  <b>Sign in</b>
              </p>
                    )}/>
                 
                    </>
                ) }
                
        </div>
     
      </div>
      {
 AuthBtn &&
      <Auth
      setAuthBtn={setAuthBtn}
      setEditCreateChannelbtn={setEditCreateChannelbtn}
      User={CurrentUser}/>
}
{
  VoIP && <VideocallFeature closeCall={()=>setVoIP(false)}/>
}

{otpPop&& (

  <div className="pop-up">
    {isSouth? 
    (<>
    <p>An OTP has been sent to your e-mail.Please Verify it</p>
    </>
    ): (<PopOTp phoneNumber={phoneNumber} handlePhoneSubmit={handlePhoneSubmit} handleotpSubmit={handleotpSubmit} setotp={setotp} setphoneNumber={setphoneNumber} otp={otp} setotpPop={setotpPop}/>
    )}
  </div>
)}

    </>
      
  );
}
