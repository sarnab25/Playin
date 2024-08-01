import React from 'react'
import "./Auth.css"
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import { useSelector } from 'react-redux'
function Auth({User, setAuthBtn, setEditCreateChannelbtn}) {
    const dispatch=useDispatch();
    const points = useSelector(state => state.currentUserReducer?.result?.points || 0);
    const onLogoutSuccess=()=>
        {
            dispatch(setCurrentUser(null));
            alert("Log out Successfull")
        }
  return (
    <div className='Auth_Container' onClick={()=>setAuthBtn(false)}>
        <div className="Auth_Container2">
            <p className='User_Details'>
                <div className='chanel_logo_app '>
                    <p className='fstChar_logo_app'>
                        {
                            User?.result.name? (
                            <>
                            {User?.result.name.charAt(0).toUpperCase()}
                            </>
                            ):
                            (
                            <>
                             {User?.result.email.charAt(0).toUpperCase()}
                            </>
                            )
                        }
                    </p>
                </div>
                <div className="email_Auth">{User?.result.email}</div>
            </p>
            <div className="btns_Auth">
                {User?.result.name ?(
                    <> 
                    <Link to={`/channel/${User?.result._id}`} className="btn_Auth">Your Channel</Link>
                </>
                ):
                (
                <>
                <input type="submit" className='btn_Auth' value="Create Your Chanel" onClick={()=>setEditCreateChannelbtn(true)}/> 
                </>
            )}
                
           
            <div>
                <GoogleLogout 
                clientId="1041837286930-spcmbvu53mjjpo2qlvo4bf67mtvkqvob.apps.googleusercontent.com"
                onLogoutSuccess={onLogoutSuccess}
                render={(renderProps)=>(
                    <div onClick={renderProps.onClick} className='btn_Auth'>
                        <BiLogOut/>
                        Log Out
                        </div>
            
                )
                    
                } />
            </div>

            <div className="points">Points : {points} </div>
            </div>
        </div>
      
    </div>
  )
}

export default Auth
