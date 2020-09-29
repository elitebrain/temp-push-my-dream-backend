import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import VideoInfo from "./VideoInfo";
import ButtonGroup from "./ButtonGroup";
import { getCookie } from "shared/functions";
import { videoApi } from "shared/api";

const VideoView = (props) => {
  const { currentVideo } = props;
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (currentVideo && currentVideo.url_1080p) {
      setSrc(null);
      setTimeout(() => setSrc(currentVideo.url_1080p), 200);
    }
  }, [currentVideo]);
  const _videoView = (videoNo) => {
    if (videoNo) {
      const existsCookie = getCookie(videoNo.toString());
      const tempId = getCookie("temp_id");
      // cookie에 videoNo가 존재하지 않으면
      if (!existsCookie) {
        const now = Date.now();
        // 만료시간 30분
        const expires = new Date(now + 1000 * 60 * 30);
        document.cookie = `${videoNo}=true;path=/;expires=${expires.toUTCString()}`;
        // 조회수 증가
        videoApi.post("/view", { videoNo, tempId }, { withCredentials: true });
      }
    }
  };
  return (
    <div className="video_view_box">
      {src ? (
        <>
          <VideoInfo currentVideo={currentVideo} />
          <video
            name="media"
            className="video_view"
            controls
            controlsList="nodownload"
            onPlay={() => _videoView(currentVideo.video_no)}
            autoPlay
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
          width: calc(778px * 9 / 16);
          height: 778px;
          margin: 0 auto;
          display: inline-block;
          vertical-align: top;
          position: relative;
          background-color: #000;
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
        @media (max-width: 1366px) {
          .video_view_box {
            width: 348px;
            height: 620px;
          }
        }
        @media (min-width: 2560px) {
          .video_view_box {
            width: calc(1015px * 9 / 16);
            height: 1015px;
          }
        }
      `}</style>
    </div>
  );
};

VideoView.propTypes = {
  video: PropTypes.object,
};

export default VideoView;
