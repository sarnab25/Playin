import * as api from '../api';
export const fetchallChannel=()=>async(dispatch)=>
{
    try{
const {data}=await api.fetchallChannel();
dispatch({type:"FETCH_CHANNEL", payload:data})
    }
    catch(error)
    {
        console.log(error)
    }
}

export const updatechannelData=(_id,updateData)=>async(dispatch)=>
{
    try{
        const {data}=await api.updatechannelData(_id,updateData)
        dispatch({type:"UPDATE_DATA", payload:data})
    }
    catch(error)
    {
        console.log(error);
    }
}