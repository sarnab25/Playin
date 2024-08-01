import React from 'react';
import ShowVideo from '../ShowVideo/ShowVideo';
import { useSelector } from 'react-redux';
// import Video1 from '../Video/Video1.MP4'
// import Video1_320p from  '../Video/Video1_320p.MP4'
// import Video1_480p from  '../Video/Video1_480p.MP4'
// import Video1_720p from  '../Video/Video1_720p.MP4'
// import Video1_1080p from  '../Video/Video1_1080p.MP4'

// import Video2 from '../Video/Video2.MP4'
// import Video2_320p from  '../Video/Video2_320p.MP4'
// import Video2_480p from  '../Video/Video2_480p.MP4'
// import Video2_720p from  '../Video/Video2_720p.MP4'
// import Video2_1080p from  '../Video/Video2_1080p.MP4'

// import Video3 from '../Video/Video3.MP4'
// import Video3_320p from  '../Video/Video3_320p.MP4'
// import Video3_480p from  '../Video/Video3_480p.MP4'
// import Video3_720p from  '../Video/Video3_720p.MP4'
// import Video3_1080p from  '../Video/Video3_1080p.MP4'



function ShowVideoList({ videoId }) {
  const vids=useSelector(state=>state.videoReducer)
  // const vids = [
  //   {
  //     _id: 1,
  //     video_src: Video1,
  //     video_src_320: Video1_320p,
  //     video_src_480: Video1_480p,
  //     video_src_720: Video1_720p,
  //     video_src_1080: Video1_1080p,
  //     channel: "fsfefwfsdsdadc",
  //     title: "Rafting",
  //     Uploader: "abc",
  //     description: " description of video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: Video2,
  //     video_src_320: Video2_320p,
  //     video_src_480: Video2_480p,
  //     video_src_720: Video2_720p,
  //     video_src_1080: Video2_1080p,
  //     channel: "cdd",
  //     title: "Rafting",
  //     Uploader: "efg",
  //     description: " description of video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: Video3,
  //     video_src_320: Video3_320p,
  //     video_src_480: Video3_480p,
  //     video_src_720: Video3_720p,
  //     video_src_1080: Video3_1080p,
  //     channel: "add",
  //     title: "Rafting",
  //     Uploader: "hij",
  //     description: " description of video 3",
  //   },
  // ];

  return (
    <div className="container_showvideogrid">
      {vids?.data.filter((q) => q._id === videoId)
        .map((vi) => (
          <div key={vi._id} className="video_box_app">
            <ShowVideo vid={vi} />
          </div>
        ))}
    </div>
  );
}

export default ShowVideoList;
