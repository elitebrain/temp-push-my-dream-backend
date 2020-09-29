import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import VideoInfo from "./VideoInfo";
import ButtonGroup from "./ButtonGroup";

const VideoView = props => {
  const { currentVideo } = props;
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (currentVideo.url_1080p) {
      setSrc(currentVideo.url_1080p);
    }
  }, [currentVideo]);
  return (
    <div className="video_view_box">
      {src ? (
        <>
          <VideoInfo />
          <video
            name="media"
            className="video_view"
            controls
            controlsList="nodownload"
          >
            <source src={src} type="video/mp4" />
          </video>
          <ButtonGroup />
        </>
      ) : (
        <div className="video_view" />
      )}
      <style jsx>{`
        .video_view_box {
          /* width: 375px; */
          /* height: 100%; */
          width: calc(758px * 9 / 16);
          height: 758px;
          margin: 0 auto;
          display: inline-block;
          vertical-align: top;
          position: relative;
        }
        .video_view_box video {
          width: 100%;
          height: 100%;
        }
        .video_view {
          position: relative;
          width: 100%;
          height: 100%;
        }
        @media (max-width: 1440px) {
          .video_view_box {
            width: calc(750px * 9 / 16);
            height: 750px;
          }
        }
      `}</style>
    </div>
  );
};

VideoView.propTypes = {
  video: PropTypes.object
};

export default VideoView;
