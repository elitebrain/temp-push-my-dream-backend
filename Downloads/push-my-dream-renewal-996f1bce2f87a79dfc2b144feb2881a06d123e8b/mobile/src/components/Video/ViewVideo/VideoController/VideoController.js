import React, { useContext } from "react";
import { ViewVideoContext } from "containers/Video/ViewVideoContainer";

import pause_ico from "public/assets/icon/mobile_pause_ico(white).svg";
import play_ico from "public/assets/icon/mobile_play_ico(white).svg";

const VideoController = () => {
  const { isPlay, isDisable, onViewController, onPlay, onPause } = useContext(
    ViewVideoContext
  );

  return (
    <div
      className={`videoController ${isDisable ? "disable" : ""}`}
      onClick={onViewController}
    >
      {isPlay ? (
        <button onClick={onPause}>
          <img src={pause_ico} alt="pause_ico" width="100%" height="100%" />
        </button>
      ) : (
        <button onClick={onPlay}>
          <img src={play_ico} alt="play_ico" width="100%" height="100%" />
        </button>
      )}
      <style jsx>{`
        .videoController {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;

          /* transition: 0.5s opacity ease-in-out;
          animation: 0.5s appearAnimate ease-in-out; */
        }
        /* .disable {
          opacity: 0;
        }

        @keyframes appearAnimate {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        } */
        .videoController button {
          width: 83px;
          height: 83px;
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideoController;
