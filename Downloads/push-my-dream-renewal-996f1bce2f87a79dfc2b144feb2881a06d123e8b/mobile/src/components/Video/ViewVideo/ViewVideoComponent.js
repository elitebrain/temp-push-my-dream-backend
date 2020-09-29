import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import Player from "components/Common/Player";

import NotExistVideoCaution from "components/Common/NotExistVideoCaution";
import { useRouter } from "next/router";

const ViewVideoComponent = (props) => {
  const { currentVideo, realIdx, error, muted, _toggleMuted } = props;
  const Router = useRouter();
  const [src, setSrc] = useState("");
  const [isIos, setIsIos] = useState(false);
  const [videoJsOptions, setVideoJsOptions] = useState({});

  useEffect(() => {
    console.log(Router.query.video_no, currentVideo);

    if (currentVideo.url_480p) {
      setSrc(currentVideo.url_480p);
      setVideoJsOptions({
        controls: true,
        sources: [
          {
            src: currentVideo.url_480p,
            type: "video/mp4",
          },
        ],
        poster: currentVideo.thumbnail,
        // controlBar: {
        //   muteToggle: {
        //     handleClick: _toggleMuted,
        //   },
        // },
      });
    }
  }, [currentVideo, Router]);
  // <video
  //   name="media"
  //   className="view_full"
  //   // autoPlay
  //   // muted={true}
  //   playsInline="1" // 아이폰에서 새창안열고 바로 재생(아이폰 정책 변경으로 필수로 넣을 것!)
  //   controls="true"
  // >
  //   <source src={src} type="video/mp4" />
  // </video>
  // useEffect(() => {
  //   const videoList = document.querySelectorAll("video");
  //   if (videoList.length > 0) {
  //     for (let i = 0; i < videoList.length; i++) {
  //       if (i === realIdx) {
  //         if (videoList[i].paused) {
  //           // videoList[i].play();
  //         }
  //       } else {
  //         if (!videoList[i].paused) {
  //           videoList[i].pause();
  //           // videoList[i].currentTime = 0;
  //         }
  //       }
  //     }
  //   }
  // }, [realIdx, src]);
  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    if (
      agent.indexOf("iphone") !== -1 ||
      agent.indexOf("ipad") !== -1 ||
      agent.indexOf("ipod") !== -1
    ) {
      setIsIos(true);
    }
  }, []);
  console.log("muted", muted);
  return (
    <>
      <Helmet>
        <link
          href="https://vjs.zencdn.net/7.6.6/video-js.css"
          rel="stylesheet"
        />
        <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
      </Helmet>
      {/* <VideoController /> */}
      {/* {isViewComment && <Reple setIsViewComment={setIsViewComment} />} */}
      <div className="container">
        {/* <div className="video_no">{videoNo}</div> */}
        {/* <RightCounter /> */}
        {/* {isIos && ( */}
        {/* <div className="history_back_frame">
          <div className="history_back_btn" onClick={() => Router.back()}>
            <img src={arrowLeft} alt="arrow_left" />
          </div>
        </div> */}
        {/* )} */}
        {/* <div className="toggle_cover" onClick={() => toggleViewBottom()} /> */}
        {/* {isViewBottom && (
          <div
            className="controller"
            onClick={() => toggleViewBottom(false)}
          >
            {isPaused ? (
              <img
                src={play_ico}
                alt="play_ico"
                onClick={() => _handlePlay("play")}
              />
            ) : (
              <img
                src={pause_ico}
                alt="pause_ico"
                onClick={() => _handlePlay("pause")}
              />
            )}
          </div>
        )} */}
        {src ? (
          <>
            {error ? (
              <div className="caution_container">
                <NotExistVideoCaution />
              </div>
            ) : (
              <Player
                option={videoJsOptions}
                currentVideo={currentVideo}
                Router={Router}
                muted={muted}
                _toggleMuted={_toggleMuted}
              />
            )}
          </>
        ) : (
          <div className="view_full" />
        )}

        <style jsx>{`
          .container {
            height: 100%;
          }

          .caution_container {
            width: 100vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .video_no {
            position: absolute;
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            right: 10px;
            top: 60px;
            border: 1px solid #fff;
            padding: 6px;
            z-index: 1;
          }
          .container {
            position: relative;
            width: 100vw;
            height: 100%;
            background-color: black;
            z-index: 1;
            text-align: left;
          }
          .history_back_frame {
            position: fixed;
            left: 20px;
            top: 54px;
            width: 20px;
            height: 50px;
          }
          .history_back_btn {
            position: absolute;
            width: 20px;
            height: 15px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .history_back_btn > img {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .toggle_cover {
            position: absolute;
            width: 100vw;
            height: calc(100vh - 290px);
            top: 0;
            left: 0;
            z-index: 2;
          }
          .container video {
            width: 100vw;
            height: 100vh;
          }
          .controller {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.75);
            z-index: 1;
          }
          .controller > img {
            width: 83px;
            height: 83px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          video::-webkit-media-controls-panel {
            display: flex !important;
            opacity: 1 !important;
          }
          @media (-webkit-video-playable-inline) {
            .container video {
              display: initial;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(ViewVideoComponent);
