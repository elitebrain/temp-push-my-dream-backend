import React, { useState, useEffect } from "react";
import PropTypes, { number } from "prop-types";
import { useSelector } from "react-redux";

import pushIconWhite from "public/assets/image/push_icon(white).png";
import emergenzaLogo from "public/assets/image/emergenza_logo(white).png";
import logoPushMyDream from "public/assets/image/logo_pushmydream_white.png";
import pushMySingerLogo from "public/assets/image/push_my_singer_logo(white).png";
import pushMyAppleLogo from "public/assets/image/push_my_apple_logo(white).png";
import pushMyDanceLogo from "public/assets/image/push_my_dance_logo(white).png";
import pushMyChocoLogo from "public/assets/image/push_my_choco_logo(white).png";

import VideoInfo from "./VideoInfo/VideoInfo";
import CommentContainer from "containers/CommentContainer";
import { setControlBarPosition, numberWithCommas } from "shared/functions";

const Bottom = (props) => {
  const {
    isPush,
    isViewBottom,
    isOfficial,
    currentVideo,
    setIsViewComment,
    totalPush,
    videoNo,
    handleLike,
    realIdx,
    active,
  } = props;
  const [opacity, setOpacity] = useState(0);
  const [zIndex, setZIndex] = useState(1);
  const [transition, setTransition] = useState("");
  const [bottom, setBottom] = useState("101px");
  const [pushMargin, setPushMargin] = useState(14);
  const [categoryLogo, setCategoryLogo] = useState(null);
  const { agent } = useSelector((state) => state.common);

  useEffect(() => {
    setControlBarPosition();
    const agent = navigator.userAgent.toLowerCase();
    if (
      agent.indexOf("naver") !== -1 &&
      agent.indexOf("mobile") !== -1 &&
      agent.indexOf("iphone") !== -1
    ) {
      setBottom("161px");
      // } else if (agent.indexOf("safari") === -1) {
      //   setBottom("121px");
    } else {
      setBottom("100px");
    }
  }, [isViewBottom]);
  useEffect(() => {
    if (isViewBottom && active) {
      setOpacity(1);
      setZIndex(2);
    } else {
      // setBottom("200px");
      setOpacity(0);
      setZIndex(1);
    }
  }, [isViewBottom, active]);
  useEffect(() => {
    if (currentVideo.category_level2_no === 1) {
      // PushMySinger
      setCategoryLogo(pushMySingerLogo);
    } else if (currentVideo.category_level2_no === 2) {
      // PushMyDream
      setCategoryLogo(logoPushMyDream);
    } else if (currentVideo.category_level2_no === 4) {
      // PushMyDance
      setCategoryLogo(pushMyDanceLogo);
    } else if (currentVideo.category_level2_no === 5) {
      // PushMyChoco
      setCategoryLogo(pushMyChocoLogo);
    } else if (currentVideo.category_level2_no === 6) {
      // Emergenza
      setCategoryLogo(emergenzaLogo);
    } else {
      // default: PushMyDream
      setCategoryLogo(logoPushMyDream);
    }
  }, [currentVideo]);

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      setPushMargin(12);
    }
  }, []);
  return (
    <div className="bottom">
      {/* {isPush && totalPush && ( */}
      <div className="push">
        <span>{numberWithCommas(1000000)}</span>
        <span>
          <img src={pushIconWhite} alt="push_text_icon" />
        </span>
      </div>
      {/* )} */}
      <div
        className="info"
        style={
          /iPad|iPhone|iPod/.test(agent)
            ? { top: isPush && totalPush ? "165px" : "165px" }
            : { top: isPush && totalPush ? "130px" : "130px" }
        }
      >
        {categoryLogo && (
          <div className="category_logo">
            <img src={categoryLogo} alt="category_logo" />
          </div>
        )}
        <div className="view">
          <span>조회수</span>
          <span>{numberWithCommas(currentVideo.countViewVideo)}</span>
        </div>
        <div className="like">
          <span>추천</span>
          <span>{numberWithCommas(currentVideo.countLikeVideo)}</span>
        </div>
      </div>
      <div className="wrapper_bottom">
        {/* <VideoReple /> */}
        {/* <CommentContainer preview videoNo={videoNo} /> */}
        <VideoInfo
          currentVideo={currentVideo}
          setIsViewComment={setIsViewComment}
          handleLike={handleLike}
          realIdx={realIdx}
          isOfficial={isOfficial}
          isPush={isPush}
        />
        {/* <RankButtonGroup
          setIsViewComment={setIsViewComment}
          currentVideo={currentVideo}
          handleLike={handleLike}
        /> */}
      </div>
      <style jsx>{`
        .push {
          position: absolute;
          top: 15px;
          width: 100%;
          height: 45px;
          line-height: 45px;
          background-color: rgba(0, 0, 0, 0.3);
          text-align: center;
          font: 22px "GmarketSansTTFMedium";
        }
        .push > span {
          display: inline-block;
          vertical-align: bottom;
          color: #fff;
        }
        .push > span:first-child {
          transform: scaleY(1.1);
          font-size: 24px;
          margin-right: 5px;
          line-height: 45px;
        }
        .push > span:last-child {
          width: 26px;
          font-size: 12px;
          margin-bottom: ${pushMargin}px;
        }
        .push > span:last-child > img {
          width: 100%;
          vertical-align: top;
        }
        .info {
          position: absolute;
          left: 20px;
          color: #fff;
          font-size: 12px;
        }
        .info > .category_logo {
          width: 70px;
          height: 36px;
          margin-bottom: 10px;
        }
        .info > .category_logo > img {
          width: 100%;
        }
        .info .view > span,
        .info .like > span {
          display: inline-block;
          vertical-align: middle;
        }
        .info .view > span:first-child,
        .info .like > span:first-child {
          width: 40px;
        }
        .bottom {
          opacity: ${opacity};
          width: 100%;
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5),
            transparent
          );
          height: calc(100% - 50px);
          overflow: hidden;
          transition: 0.2s ease-in-out;
          z-index: ${zIndex};
        }
        .wrapper_bottom {
          position: absolute;
          overflow: hidden;
          left: 0;
          bottom: 0;
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

Bottom.propTypes = {
  isPush: PropTypes.bool.isRequired,
  isViewBottom: PropTypes.bool.isRequired,
  isOfficial: PropTypes.bool.isRequired,
  totalPush: PropTypes.number,
  // currentVideo: PropTypes.node,
  setIsViewComment: PropTypes.func,
  handleLike: PropTypes.func,
};

export default Bottom;
