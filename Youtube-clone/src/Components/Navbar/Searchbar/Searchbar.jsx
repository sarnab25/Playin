
// import React from 'react';
 import {FaSearch} from "react-icons/fa"
 import {BsMicFill} from "react-icons/bs"
import "./Searchbar.css"
import SearchList from "./SearchList"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export default function Searchbar()
{
    const[searchQuery, setsearchQuery]=useState("");
    const[searchList, setsearchList]=useState(false);
    const titleArray =useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videotitle.toUpperCase().includes(searchQuery?.toUpperCase())).map(m=>m?.videotitle)
    // const titleArray =["video1" , "Video2", "Animation video", "Movies"].filter(q=>q.includes(searchQuery));
    return (
        <>
        <div className="Searchbar_Container">
            <div className="Searchbar_container2">
                <div className="search_div">
                    <input type="text" className="iBox_SearchBar" placeholder="Search" onChange={e=>setsearchQuery(e.target.value)} value={searchQuery} onClick={e=>setsearchList(true)}/>
                 <Link to={`search/${searchQuery}`}>  <FaSearch className='searchIcon_SearchBar' onClick={e=> setsearchList(false)}/></Link> 
                    <BsMicFill className='Mic_SearchBar'/>
            {
searchQuery && searchList&& <SearchList titleArray={titleArray} setsearchQuery={setsearchQuery}/>
            }        
 
                    
                   

                </div>
            </div>
        </div>
        </>
    )
}