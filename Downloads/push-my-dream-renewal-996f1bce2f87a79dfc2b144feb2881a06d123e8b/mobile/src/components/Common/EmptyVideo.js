import React from "react";
import PropTypes from "prop-types";

const EmptyVideo = props => {
  return (
    <div className="empty_video">
      등록된 영상이 없습니다.
      <style jsx>{`
        .empty_video {
          width: 100%;
          height: 300px;
          line-height: 300px;
          text-align: center;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

EmptyVideo.propTypes = {};

export default EmptyVideo;
