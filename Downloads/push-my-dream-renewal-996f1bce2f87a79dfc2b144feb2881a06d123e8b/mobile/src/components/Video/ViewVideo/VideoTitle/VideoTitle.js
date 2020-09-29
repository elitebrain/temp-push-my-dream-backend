import React from "react";

const VideoTitle = () => {
  return (
    <>
      <div className="video_title">
        EMERGENZA 2020 한국대표 선발대회 온라인 예선 투표중(~3/31)
      </div>
      <style jsx>{`
        .video_title {
          width: 295px;
          line-height: 32px;
          padding: 0 10px;
          background-color: inherit;
          color: #fff;
          font-size: 13px;
          text-align: center;
          border: 1px solid #fff;
          border-radius: 15px;

          /* margin-top: 145px;
          margin-bottom: 20px; */

          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </>
  );
};

export default VideoTitle;
