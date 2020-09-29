import React from "react";

const VideoInfo = () => {
  return (
    <div className="video_info_container">
      <div className="title">2020 4TH PUSH MY CHOCO FESTA</div>
      <div className="info">
        <div className="count">
          <span>조회수</span>
          <span>1,643</span>
        </div>
        <div className="dot" />
        <div className="count">
          <span>추천</span>
          <span>543</span>
        </div>
        <div className="dot" />
        <div className="date">2020.01.08</div>
      </div>
      <style jsx>{`
        .video_info_container {
          /* width: 100%; */
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          white-space: nowrap;
        }
        .title {
          color: #fff;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 5px 10px;
          border-radius: 50px;
          margin-bottom: 15px;
        }
        .info {
          font-size: 14px;
          font-weight: 100;
          color: #fff;
          text-align: center;
        }
        .info .count,
        .info .dot,
        .info .date {
          display: inline-block;
          vertical-align: middle;
        }
        .info .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #fff;
          margin: 0 10px;
        }
        .info .count span:first-child {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default VideoInfo;
