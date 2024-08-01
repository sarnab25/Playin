import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./CreateEditchannel.css"
import {updatechannelData} from '../../actions/channeluser'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'
function CreateEditchannel({setEditCreateChannelbtn}) {
const dispatch=useDispatch();
    const CurrentUser= useSelector(state=>state.currentUserReducer)
    const [name, setname]= useState(CurrentUser?.result.name)
    const [desc, setdesc]=useState(CurrentUser?.result.desc)

const handleSubmit=()=>
{
    if(!name)
    {
        alert("Please Enter Name")
    }
    else if(!desc)
    {
        alert("Please Enter Description")
    }
    else{

        dispatch(updatechannelData(CurrentUser?.result._id, {name:name, desc:desc}))
        setEditCreateChannelbtn(false);
        setTimeout(()=>
        {
            dispatch(login({email:CurrentUser.result.email}))
        },5000)
    }
}
  return (
    <div className="container_CreateEditChannel">
        <input type="submit" name='text' value={'X'} className='ibtn_x' onClick={()=>setEditCreateChannelbtn(false)} />
        <div className="container2_CreateEditChannel">
            <h1>{CurrentUser?.result.name ? <>Edit</> : <>Create</>}Your Channel</h1>
            <input type="text" placeholder='Enter Your Channel Name' name='text' value={name}  onChange={(e)=>setname(e.target.value)} className='ibox'/>
            <textarea type="text" rows={15} className="ibox" placeholder='Enter Channel Description' value={desc} onChange={(e)=>setdesc(e.target.value)}></textarea>
            <input type="submit"  value={"submit"} onClick={handleSubmit} className="ibtn" />
        </div>
    </div>
  )
}

export default CreateEditchannel
