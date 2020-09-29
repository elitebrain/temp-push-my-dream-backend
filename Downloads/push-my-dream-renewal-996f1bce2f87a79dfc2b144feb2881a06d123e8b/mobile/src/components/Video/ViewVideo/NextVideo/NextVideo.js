import React, { useState, useEffect } from "react";
import VideoWidth from "components/Common/VideoWidth";

const newVideoList = [
  {
    video_no: 1,
    thumbnail:
      "https://kr.object.ncloudstorage.com/push-my-dream/v/1/1578287930446_000001.jpg",
    description: "중저음의 마성적인 보이스! 박형구 ♬",
    title: "임재범 - 너를 위해",
    countView: 90,
    countLike: 11
  },
  {
    video_no: 2,
    thumbnail:
      "https://kr.object.ncloudstorage.com/push-my-dream/v/2/1578297623945_000001.jpg",
    description: "감정선 실화?? 감성괴물 등장!! 고재성 ♬",
    title: "폴킴 - 초록빛",
    countView: 83,
    countLike: 9
  }
];

const NextVideo = props => {
  const [tempList, setTempList] = useState([]);
  useEffect(() => {
    setTempList(newVideoList);
  }, []);
  return (
    <div className="netxt_video">
      <div className="title">다음 동영상</div>
      <div className="next_video">
        {tempList &&
          tempList.map((video, i) => (
            <VideoWidth
              key={video.video_no}
              thumbnail={video.thumbnail}
              description={video.description}
              title={video.title}
              countView={video.countView}
              countLike={video.countLike}
            />
          ))}
      </div>
      <style jsx>{`
        .netxt_video {
          display: inline-block;
        }
        .netxt_video .title {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default NextVideo;
