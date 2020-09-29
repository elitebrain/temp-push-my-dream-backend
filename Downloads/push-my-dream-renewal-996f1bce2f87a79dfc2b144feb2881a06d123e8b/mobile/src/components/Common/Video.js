import React, { useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import viewIco from "public/assets/icon/view_ico.svg";
import likeIco from "public/assets/icon/like_ico.svg";
import lockWhite from "public/assets/image/lock_white.png";
import checkOrange from "public/assets/image/check_orange.png";
import { imgOnLoad, numberWithCommas } from "shared/functions";
import { MORE_VIDEO } from "store/reducers/offset";
import CategoryCircle from "./CategoryCircle";

const Video = props => {
  const {
    videoNo,
    thumbnail,
    description,
    title,
    categoryLevel1No,
    teamName,
    nickname,
    countView,
    countLike,
    className,
    mypage,
    isViewCategory,
    handleMenu,
    selectedVideoNo,
    flag,
    onToggleFlagByVideoNo,
    STATUS,
    onRemoveVideo,
    listGubun,
    idx,
    currentUserNo,
    category
  } = props;

  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const { lastRealIdx, scrollTop, uploaderScrollTop } = useSelector(
    state => state.offset
  );
  const dispatch = useDispatch();
  const _handleVideo = async (e, videoNo) => {
    e.target.style.cursor = "wait";
    dispatch({
      type: MORE_VIDEO,
      data: {
        viewVideoOffset: idx,
        lastRealIdx: listGubun === "user" ? lastRealIdx : 0,
        userVideoIdx: idx,
        scrollTop:
          listGubun === "user"
            ? scrollTop
            : document.querySelector("html").scrollTop,
        uploaderScrollTop:
          listGubun === "user"
            ? document.querySelector(".wrapper_layout > .user_profile")
                .scrollTop
            : uploaderScrollTop
      }
    });
    // const pathname = listGubun === "user" ? "/video/user" : "/video";
    setTimeout(() => {
      if (listGubun === "user") {
        Router.push({
          pathname: "/video/user",
          query: { videoNo, listGubun, currentUserNo, category, offset: idx }
        });
      } else {
        Router.push("/video/[video_no]", {
          pathname: `/video/${videoNo}`,
          query: { listGubun, currentUserNo, category, offset: idx }
        });
      }
    }, 200);
    // if (listGubun === "user") {
    //   setIsViewUserProfile();
    // }
  };
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  return (
    <div className={`wrapper_video ${className ? className : ""}`}>
      <div className="thumbnail" onClick={e => _handleVideo(e, videoNo)}>
        {isViewCategory && (
          <CategoryCircle
            category={category}
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              zIndex: "2"
            }}
          />
        )}
        <div className="count_like">
          <h4>{countLike ? numberWithCommas(countLike) : "0"}</h4>
          <img src={likeIco} alt="count_like_ico" />
        </div>
        <img src={thumbnail} alt="video_thumbnail" onLoad={_imgOnLoad} />
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
        <div className="team_name">
          <h3>{category === 6 ? teamName : nickname}</h3>
        </div>
      </div>
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
        {category === 6 ? description : title}
      </div>
      <div className="record">
        <img src={viewIco} alt="count_view_ico" />
        <span>{countView ? numberWithCommas(countView) : "0"}</span>
      </div>
      {/* <div className="record">{`조회수 ${countView} 좋아요 ${countLike}`}</div> */}
      <style jsx>{`
        .wrapper_video {
          position: relative;
          display: inline-block;
          width: calc((100% - 24px) / 3);
          height: 236px;
          margin-right: 12px;
          margin-bottom: 31px;
          z-index: ${selectedVideoNo === videoNo ? 4 : 1};
          vertical-align: middle;
        }
        .wrapper_video:nth-child(3n + 1) {
          margin-right: 0;
        }
        .thumbnail {
          position: relative;
          width: 100%;
          height: 175px;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 11px;
          background-color: #000;
        }
        .thumbnail > img {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .count_like {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 2;
        }
        .count_like > img,
        .count_like > h4 {
          display: inline-block;
          vertical-align: bottom;
        }
        .count_like > h4 {
          font-size: 11px;
          line-height: 13px;
          font-weight: 400;
          color: #fff;
          margin-right: 3px;
        }
        .team_name {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 2;
          background-color: rgba(43, 42, 42, 0.5);
          font-size: 12px;
          color: #fff;
          font-weight: 700;
          height: 26px;
          overflow: hidden;
          width: 100%;
        }
        .team_name > h3 {
          position: absolute;
          left: 8px;
          top: 6px;
          height: 14px;
          line-height: 14px;
          white-space: nowrap;
          width: calc(100% - 23px);
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .description {
          width: ${mypage ? "calc(100% - 23px)" : "100%"};
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 14px;
          font-size: 12px;
          height: 28px;
          word-break: break-all;
          color: #fff;
          text-overflow: ellipsis;
        }
        .record {
          width: ${mypage ? "calc(100% - 23px)" : "100%"};
          font-size: 11px;
          line-height: 13px;
          font-weight: 700;
          color: #858585;
          margin-top: 9px;
          margin-bottom: 31px;
        }
        .record > img,
        .record > span {
          vertical-align: middle;
        }
        .record > span {
          margin-left: 3px;
        }
        .lock {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 5px;
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
          font-size: 14px;
          word-break: keep-all;
        }
        .menu_dot {
          position: absolute;
          width: 17px;
          height: 17px;
          bottom: 30px;
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
          width: 100px;
          height: 128px;
          border-radius: 20px;
          background-color: #fff;
          color: #000;
          padding: 6px 16px;
          bottom: -108px;
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
        .title {
          font-size: 15px;
          color: #fff;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
  teamName: PropTypes.string,
  nickname: PropTypes.string,
  description: PropTypes.string,
  categoryLevel1No: PropTypes.number,
  countView: PropTypes.number,
  countLike: PropTypes.number,
  className: PropTypes.string,
  mypage: PropTypes.bool,
  handleMenu: PropTypes.func,
  selectedVideoNo: PropTypes.number,
  flag: PropTypes.bool,
  onToggleFlagByVideoNo: PropTypes.func,
  isViewCategory: PropTypes.bool,
  category: PropTypes.number
};

export default Video;
