import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const VideoView = props => {
  const { currentVideo } = props;
  // const { videoRef } = useContext(ViewVideoContext);
  // const { currentVideo } = useSelector(state => state.video);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (currentVideo.url_1080p) {
      setSrc(currentVideo.url_1080p);
    }
  }, [currentVideo]);
  return (
    <div className="video_view_box">
      {/* <video
        name="media"
        className="video_view"
        controls
        // onPlay={onIncreaseView}
      >
        <source src={src} type="video/mp4" />
      </video> */}
      {src ? (
        <video
          name="media"
          className="video_view"
          controls
          controlsList="nodownload"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="video_view" />
      )}
      <style jsx>{`
        .video_view_box {
          width: 375px;
          height: 770px;
          margin: 0 auto;
          display: inline-block;
          vertical-align: top;
          margin-bottom: 35px;
          position: relative;
        }
        .video_view_box video {
          width: 100%;
          height: 770px;
        }
        .video_view {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
};

VideoView.propTypes = {
  video: PropTypes.object
};

export default VideoView;
