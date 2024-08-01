import React from 'react'
import "./DescribeChannel.css"
import { FaEdit, FaUpload } from 'react-icons/fa'
import { useSelector } from 'react-redux'
function DescribeChannel({setEditCreateChannelbtn,id, setvideoUploadPage}) {
    const channel=useSelector(state=>state.channelReducer);
   

    const currChannel=channel.filter((c)=>c._id===(id))[0]
    const CurrentUser= useSelector(state=>state.currentUserReducer)    
  return (
    <div className='container_chanel'>
        <div className="chanel_logo_chanel">
            <b>{currChannel?.name.charAt(0).toUpperCase()}</b>
        </div>

        <div className="decription_chanel">
            <b>{currChannel?.name}</b>
            <p>{currChannel?.desc}</p>
        </div>
      {CurrentUser?.result._id===currChannel?._id && (
        <>
        <p className="editbtn_chanel" onClick={()=>setEditCreateChannelbtn(true)}>
            <FaEdit/>
            <b>Edit Channel</b>
        </p>

        <p className="uploadbtn_chanel" onClick={()=>setvideoUploadPage(true)}>
            <FaUpload/>
            <b>Upload Video</b>
        </p>
        </>
      )}
    </div>
  )
}

export default DescribeChannel
