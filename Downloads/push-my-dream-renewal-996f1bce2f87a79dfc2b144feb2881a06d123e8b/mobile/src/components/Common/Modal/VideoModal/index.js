import React from "react";
import PropTypes from "prop-types";

const VideoModal = ({ video }) => {
  return (
    <div className="VideoModal__Container">
      <video
        name="media"
        width="100%"
        height="100%"
        controls
        controlsList="nodownload"
        poster={video.thumbnail}
      >
        <source src={video.url_1080p} type="video/mp4" />
      </video>
      <style jsx>{`
        .VideoModal__Container {
          width: 100%;
          max-width: 640px;
          max-height: calc(640px * 9 / 16);
        }
      `}</style>
    </div>
  );
};

VideoModal.propTypes = {
  video: PropTypes.shape({
    thumbnail: PropTypes.string,
    url_1080p: PropTypes.string
  })
};

export default VideoModal;
