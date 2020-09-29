import React, { useEffect, useRef, useState, useMemo, useContext } from "react";

import videojs from "video.js";

import { NewViewVideoContext } from "containers/Video/NewViewVideoContainer";

const VideoPlayer = (props) => {
  const { isFullscreen } = props;
  const {
    videoPlayerRef,
    videoNo,
    currentVideoInfo,
    isViewVideo,
    setIsViewVideo,
    error,
  } = useContext(NewViewVideoContext);
  const [isInitialMuted, setIsInitialMuted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [style, setStyle] = useState({});
  const [rotateDeg, setRotateDeg] = useState(90);

  const videoRef = useRef(null);

  useEffect(() => {
    const _handleOrientation = (e) => {
      if (e.gamma < -30 && Math.abs(e.beta) < 30) {
        setRotateDeg(90);
      }
      if (e.gamma > 30 && Math.abs(e.beta) < 30) {
        setRotateDeg(270);
      }
      // const diff = e.beta - e.gamma;
      // if (diff > 45) {
      //   setRotateDeg(90);
      // }
      // if (diff < -45) {
      //   setRotateDeg(270);
      // }
    };
    window.addEventListener("deviceorientation", _handleOrientation, true);
    return () =>
      window.removeEventListener("deviceorientation", _handleOrientation, true);
  }, []);

  useEffect(() => {
    // 전체화면에서 가로형 영상이면 90도 회전
    if (
      isFullscreen &&
      videoRef.current.videoWidth > videoRef.current.videoHeight
    ) {
      setStyle({
        transform: `rotate(${rotateDeg}deg)`,
        height: "100vw",
        width: "100vh",
        top: "25%",
        left: "-50%",
        transition: ".3s ease-in-out",
      });
    } else {
      setStyle({});
    }
  }, [isFullscreen, rotateDeg]);

  /**
   * 첫 화면 렌더링 시 소리 출력 세팅
   */
  useEffect(() => {
    const eventFunction = () => {
      if (!isInitialMuted) {
        setImmediate(() => {
          if (videoRef.current) {
            videoRef.current.muted = false;
          }
          setIsInitialMuted(true);
        });
      }
    };

    videoRef.current.addEventListener("loadedmetadata", eventFunction);

    return function cleanup() {
      videoRef.current.removeEventListener("loadedmetadata", eventFunction);
    };
  }, [isInitialMuted]);

  /**
   * 영상 초기화
   */
  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      setIsLoaded(false);
    }

    if (videoRef.current) {
      // 비디오 초기화
      if (!videoPlayerRef.current) {
        if (!isCancelled) {
          videoPlayerRef.current = videojs(videoRef.current, {
            sources: [
              {
                src: currentVideoInfo.url_720p,
                type: "video/mp4",
              },
            ],
            loop: true,
            autoplay: true,
            controls: true,
            preload: "auto",
            options: {
              navigationUI: "show",
            },
            // controlBar: {
            //   children: {
            //     playToggle: {},
            //     muteToggle: {},
            //     currentTimeDisplay: {},
            //     durationDisplay: {},
            //     progressControl: {},
            //     settingsMenuButton: {
            //       entries: ["subtitlesButton", "playbackRateMenuButton"],
            //     },
            //     fullscreenToggle: {},
            //   },
            // },
          });
        }
      }
      // 비디오 변경
      //   // 조회 성공 시 visiblity 를 visible로 변경 후 자동으로 재생하게 한다.
      else {
        if (currentVideoInfo) {
          if (!isCancelled) {
            videoPlayerRef.current.src({
              src: currentVideoInfo.url_720p,
              type: "video/mp4",
            });
          }

          // 비디오 정보 조회 이벤트
          if (!isCancelled) {
            videoPlayerRef.current.on("loadeddata", () => {
              if (!isCancelled) {
                setIsLoaded(true);

                setIsViewVideo(true);
              }
            });
          }
        }
      }
    }

    return function cleanup() {
      isCancelled = true;
      videoPlayerRef.current.pause();
      videoPlayerRef.current.off("loadeddata");
    };
  }, [videoPlayerRef.current, currentVideoInfo && currentVideoInfo.video_no]);

  useEffect(() => {
    if (Boolean(error)) {
      setIsViewVideo(false);
    } else {
    }
  }, [error]);

  /**
   * 스와이프 해제 시 동작
   */
  useEffect(() => {
    let isCancelled = false;
    if (videoPlayerRef.current && isLoaded) {
      if (!isViewVideo) {
        if (!isCancelled) videoPlayerRef.current.pause();
      } else {
        if (!isCancelled) videoPlayerRef.current.play();
      }
    }

    return function cleanup() {
      isCancelled = true;
    };
  }, [videoPlayerRef.current, isViewVideo, isLoaded]);

  /**
   * 클래스 캐싱
   * 슬라이드를 하고 있거나 비디오가 로딩되지 않았으면 출력되지 않는다.
   */
  const videoContainerClass = useMemo(() => {
    return `VideoContainer${isViewVideo && isLoaded ? "" : " hide"}
  `;
  }, [isViewVideo, isLoaded]);
  useEffect(() => {
    // if (isViewVideo && isLoaded) {
    if (isViewVideo && isLoaded) {
      console.log(isFullscreen, isViewVideo, isLoaded, document.querySelector(".vjs-fullscreen-control"))
      document.querySelector(".vjs-fullscreen-control").addEventListener("click", () => document.body.style.opacity = 0)
    }
    // }
  }, [isFullscreen, isViewVideo, isLoaded]);
  return (
    <>
      <div className={videoContainerClass}>
        <div data-vjs-player>
          <video
            ref={videoRef}
            className={`video-js`}
            playsInline={true}
            webkit-playsinline="true"
            muted={muted}
            width="100%"
            height="100%"
            style={style}
          ></video>
        </div>
      </div>
      <div className="control_wrapper" />
      <style jsx global>{`
        .VideoContainer {
          display: flex;
          align-items: center;

          width: 100%;
          height: 100%;

          position: absolute;
          top: 0;
          left: 0;
        }

        .VideoContainer.hide {
          visibility: hidden;
        }

        .video-js {
          width: 100vw !important;
          height: 100% !important;
          background-color: initial !important;
        }

        .video-js .vjs-control-bar {
          visibility: visible !important;
          margin: auto;
          background: none !important;
          background: rgba(0, 0, 0, 0.5) !important;
        }
        .vjs-controls-disabled .vjs-control-bar {
          display: flex !important;
        }

        .video-js .vjs-control-bar {
          display: flex !important;
          opacity: 1 !important;
          height: 50px;
        }

        .vjs-loading-spinner {
          display: none !important;
        }

        /* .control_wrapper {
          height: 50px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: -1;
        } */
      `}</style>
    </>
  );
};

export default VideoPlayer;
