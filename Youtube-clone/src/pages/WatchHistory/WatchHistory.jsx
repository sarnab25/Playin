import React from 'react';
import { useSelector } from 'react-redux';

import WHL from '../../Components/WHL/WHL';

function WatchHistory() {
  const watchhistoryvideolist=useSelector(s=>s.historyreducer)  // const history = [
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
    <>
      <WHL page={"History"} videoList={watchhistoryvideolist} />
    </>
  );
}

export default WatchHistory;
