import React from 'react';
import './WHL.css';
import Leftsidebar from '../../Components/Leftsidebar/Leftsidebar';
import WHLvideoList from './WHLvideoList';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {clearhistory} from '../../actions/history'


function WHL({ page, videoList }) {
  const currentUser=useSelector(state => state.currentUserReducer);
  const dispatch=useDispatch()
    const handleclearhistory=()=>{
        if(currentUser){
            dispatch(clearhistory({
                userid:currentUser?.result._id
            }))
        }
    }
  return (
    <div className="container_pages_app">
      <Leftsidebar />
      <div className="container2_pages_app">
        <div className="delete">
        <div className="whl_box leftside_whl">
          <b>Your {page} shown here</b>
          {
            page==='History'&&
          <div className="clr_history_btn" onClick={handleclearhistory}>Clear History</div>
          }
        </div>
        <div className="rightside_whl">
          <h1>{page}</h1>
          <div className="whl_list">
            <WHLvideoList page={page} videoList={videoList} curruser={currentUser?.result._id}/>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default WHL;
