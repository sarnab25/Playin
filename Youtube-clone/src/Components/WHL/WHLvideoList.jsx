import React from 'react';
import ShowVideoList from '../ShowVideoList/ShowVideoList';

function WHLvideoList({ page, videoList,curruser }) {
  return (
    <>
     {curruser?(
      
      <>
      {
                        videoList?.data.filter(q => q?.viewer === curruser).reverse().map(m => {
                            console.log(m)
                            return (
                                <>
                                    <ShowVideoList videoId={m?.videoid} key={m?._id}/>
                                </>
                            )
                        })
                    }

      
      </>
      ):(
      
      <>
      <h2 style={{ color: "white" }}>Please login to Watch your {page}</h2>
      </>
      
    )

     }
    </>
  );
}

export default WHLvideoList;
