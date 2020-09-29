import React from "react";

import content_logo from "public/assets/icon/logo.svg";
import { numberWithCommas } from "shared/functions";

const VideoInfo = (props) => {
  const { currentVideo } = props;
  return (
    <div className="video_info_container">
      <div className="title">
        <img src={content_logo} alt="logo" width="100%" height="100%" />
      </div>
      <div className="info">
        <div className="count">
          <span>조회수</span>
          <span>{numberWithCommas(currentVideo.countViewVideo)}</span>
        </div>
        <div className="count">
          <span>추천</span>
          <span>{numberWithCommas(currentVideo.countLikeVideo)}</span>
        </div>
      </div>
      <style jsx>{`
        .video_info_container {
          /* width: 100%; */
          position: absolute;
          top: 20px;
          left: 25px;
          z-index: 1;
          white-space: nowrap;
        }
        .title {
          width: 75px;
          height: 30px;
          margin-bottom: 10px;
        }
        .info {
          font-size: 13px;
          font-weight: normal;
          color: #fff;
        }
        .info .count span:first-child {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default VideoInfo;
