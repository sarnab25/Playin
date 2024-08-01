
import * as api from '../api';
export  const uploadvideo=(videodata)=>async(dispatch)=>
{
    try {
        const {filedata,fileoption}=videodata;
        const {data}=await api.uploadvideo(filedata,fileoption)
        dispatch({type:'POST_VIDEO',data})
        dispatch(getallVideo())
    } catch (error) {
        alert(error.response.data.message)
        console.error("Error uploading video:", error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : error.message);
    }
}

export const getallVideo=()=>async(dispatch)=>
{
    try {
        const {data}=await api.getvideos()
        dispatch({type:"FETCH_ALL_VIDEOS",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const likevideo=(likedata)=>async(dispatch)=>
{
    try {
        const {id, Like}=likedata
    const{data}=api.likevideo(id,Like)
    dispatch({type:"POST_LIKE", data})
    dispatch(getallVideo())
    } catch (error) {
        console.log(error)
    }
    
}

export const viewsvideo=(viewdata)=>async(dispatch)=>
{

    try {
        const{id} =viewdata
        console.log(id)
        const {data}= await api.viewsvideo(id)
        dispatch({type:"POST VIEWS",data})
        dispatch(getallVideo());
    } catch (error) {
      console.log(error)  
    }
   
}