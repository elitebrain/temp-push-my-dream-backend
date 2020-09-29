import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import lockWhite from "public/assets/image/lock_white.png";
import checkOrange from "public/assets/image/check_orange.png";
import emergenzaBadge from "public/assets/image/emergenza_badge.png";
import { imgOnLoad } from "shared/functions";
import { MORE_VIDEO } from "store/reducers/offset";
import CategoryCircle from "./CategoryCircle";

const Video = props => {
  const {
    videoNo,
    thumbnail,
    teamName,
    nickname,
    description,
    title,
    countView,
    countLike,
    className,
    mypage,
    isViewCateogry,
    handleMenu,
    selectedVideoNo,
    flag,
    onToggleFlagByVideoNo,
    onRemoveVideo,
    STATUS,
    category,
    idx,
    ...rest
  } = props;

  const router = useRouter();
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const dispatch = useDispatch();
  const _handleVideo = (e, videoNo) => {
    e.target.style.cursor = "wait";
    dispatch({
      type: MORE_VIDEO,
      data: {
        viewVideoOffset: idx,
        scrollTop: document.querySelector("html").scrollTop
      }
    });
    router.push("/video/[video_no]", `/video/${videoNo}`);
  };
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  return (
    <div className={`wrapper_video ${className}`} {...rest}>
      <div className="thumbnail" onClick={e => _handleVideo(e, videoNo)}>
        <img
          className="video_thumbnail"
          src={thumbnail}
          alt="video_thumbnail"
          onLoad={_imgOnLoad}
        />
        {mypage && STATUS.status_no !== 6 ? (
          <div className="lock">
            <div>동영상 업로드에 실패하였습니다.</div>
          </div>
        ) : flag === 1 ? (
          <div className="lock">
            <img src={lockWhite} alt="lock_white" />
          </div>
        ) : flag === 2 ? (
          <div className="lock">
            <div>
              신고로 인해
              <br /> 잠금상태로 변경됐습니다.
            </div>
          </div>
        ) : null}
      </div>
      {/* 좌측상단 카테고리 보여주기 여부 */}
      {isViewCateogry && (
        <CategoryCircle
          category={category}
          style={{ position: "absolute", top: "15px", left: "15px" }}
        />
      )}
      {category === 6 && (
        <img
          className="emergenza_badge"
          src={emergenzaBadge}
          alt="emergenza_badge"
        />
      )}
      {mypage && (
        <span className="menu_dot" onClick={() => handleMenu(videoNo)}>
          <span />
          <span />
          <span />
        </span>
      )}
      {mypage && selectedVideoNo === videoNo && (
        <span className="menu">
          <div
            className="open"
            onClick={onToggleFlagByVideoNo.bind(this, videoNo, 0)}
          >
            공개
            {!flag ? <img src={checkOrange} alt="check" /> : ""}
          </div>
          <div
            className="close"
            onClick={onToggleFlagByVideoNo.bind(this, videoNo, 1)}
          >
            비공개
            {flag ? <img src={checkOrange} alt="check" /> : ""}
          </div>
          <div className="delete" onClick={onRemoveVideo}>
            삭제
          </div>
        </span>
      )}
      <div className="description" onClick={e => _handleVideo(e, videoNo)}>
        {category === 6 ? teamName : nickname}
        {/* {teamName || description} */}
      </div>
      <div className="title" onClick={e => _handleVideo(e, videoNo)}>
        {title}
      </div>
      <div className="record">{`조회수 ${countView || 0} 좋아요 ${countLike ||
        0}`}</div>
      <style jsx>{`
        .wrapper_video {
          position: relative;
          display: inline-block;
          width: 282px;
          height: 355px;
          margin-right: 24px;
          margin-bottom: 60px;
          z-index: ${selectedVideoNo === videoNo ? 4 : 1};
          vertical-align: middle;
        }
        .lock {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 2;
          text-align: center;
        }
        .lock > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 76px;
          height: 76px;
        }
        .lock > div {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
        }
        .menu_dot {
          position: absolute;
          width: 17px;
          height: 17px;
          top: 282px;
          right: 3px;
        }
        .menu_dot > span {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: #fff;
          left: 7px;
        }
        .menu_dot > span:nth-child(1) {
          top: 0;
        }
        .menu_dot > span:nth-child(2) {
          top: 7px;
        }
        .menu_dot > span:nth-child(3) {
          top: 14px;
        }
        .menu {
          position: absolute;
          width: 108px;
          height: 128px;
          border-radius: 20px;
          background-color: #fff;
          color: #000;
          padding: 6px 16px;
          top: 309px;
          right: 3px;
          box-sizing: border-box;
        }
        .menu > div {
          padding: 4px;
        }
        .menu > .open {
          position: relative;
          margin-bottom: 1px;
          color: ${!flag ? "#f38400" : "000"};
        }
        .menu > .close {
          position: relative;
          margin-bottom: 16px;
          color: ${!flag ? "000" : "#f38400"};
        }
        .menu > .open > img,
        .menu > .close > img {
          position: absolute;
          top: 50%;
          right: 4px;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
        }
        .menu > .close:before {
          position: absolute;
          content: "";
          left: 0;
          bottom: -10px;
          border-bottom: 1px solid #e5e5e5;
          width: 100%;
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
          width: 282px;
          height: 260px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 15px;
        }
        .thumbnail > .video_thumbnail {
          position: absolute;
          width: ${imgWidth};
          height: ${imgHeight};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .emergenza_badge {
          position: absolute;
          left: 0;
          top: 30px;
          background: rgba(255, 255, 255, 0.7);
          width: 123px;
          height: auto;
        }
        .title,
        .description {
          font-size: 17px;
          color: #fff;
          width: 266px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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

Video.propTypes = {
  videoNo: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  nickname: PropTypes.string,
  countView: PropTypes.number,
  countLike: PropTypes.number,
  className: PropTypes.string,
  mypage: PropTypes.bool,
  isViewCateogry: PropTypes.bool,
  handleMenu: PropTypes.func,
  selectedVideoNo: PropTypes.number,
  flag: PropTypes.number,
  onToggleFlagByVideoNo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
  STATUS: PropTypes.object,
  category: PropTypes.number
};

export default Video;
