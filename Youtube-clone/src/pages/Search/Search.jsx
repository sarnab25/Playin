import React from "react";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Search=()=>
{
const {searchquery}=useParams();
const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videotitle.toUpperCase().includes(searchquery.toUpperCase()))


return(
    <div className="container_pages_app">
<Leftsidebar/>
<div className="container2_pages_app">
    <ShowVideoGrid vids={vids}/>
</div>
    </div>
)
}
export default Search