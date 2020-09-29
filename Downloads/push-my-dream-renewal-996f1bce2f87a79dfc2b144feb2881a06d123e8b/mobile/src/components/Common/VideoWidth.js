import React from "react";

const VideoWidth = props => {
  const {
    thumbnail,
    title,
    description,
    countView,
    countLike,
    className
  } = props;
  return (
    <div className={`wrapper_video ${className}`}>
      <div className="thumbnail">
        <img src={thumbnail} alt="video_thumbnail" />
      </div>
      <div className="thumbnail_info">
        <div className="description">{description}</div>
        <div className="title">{title}</div>
        <div className="record">{`조회수 ${countView} 좋아요 ${countLike}`}</div>
      </div>
      <style jsx>{`
        .wrapper_video {
          position: relative;
          margin-bottom: 60px;
          z-index: 1;
        }
        .wrapper_video:last-child {
          margin-bottom: 0;
        }
        .wrapper_video:hover {
          cursor: pointer;
        }
        .wrapper_video:hover > .description,
        .wrapper_video:hover > .title {
          text-decoration: underline;
        }
        .thumbnail {
          position: relative;
          width: 190px;
          height: 135px;
          border-radius: 20px;
          overflow: hidden;
          display: inline-block;
          margin-right: 20px;
        }
        .thumbnail_info {
          width: 190px;
          display: inline-block;
          vertical-align: top;
        }
        .thumbnail_info .description {
          display: inline-block;
        }
        .thumbnail_info .title {
          display: inline-block;
        }
        .thumbnail > img {
          position: absolute;
          width: 160%;
          height: auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .title,
        .description {
          font-size: 17px;
          color: #fff;
        }
        .record {
          font-size: 15px;
          color: #878792;
          margin-top: 10px;
        }
        .mr_0 {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default VideoWidth;
