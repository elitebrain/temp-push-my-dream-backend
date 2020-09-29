import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import PropTypes from "prop-types";
import logo from "public/assets/icon/logo_bird_w.svg";

import emergenzaBadge from "public/assets/image/emergenza_badge.png";
import like_img from "public/assets/image/like_img(white).png";
import video_profile_img from "public/assets/image/video_profile_img.png";
import personFollow from "public/assets/image/person_follow.png";
import { numberWithCommas, imgOnLoad } from "shared/functions";
import { ViewVideoContext } from "containers/Video/ViewVideoContainer";
import Button from "components/Common/Button";
import CategoryCircle from "components/Common/CategoryCircle";

const VideoInfo = props => {
  const { currentVideo } = props;
  const { _handleLike, isOfficial } = useContext(ViewVideoContext);
  const [userPhoto, setUserPhoto] = useState("");
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  useEffect(() => {
    if (currentVideo && currentVideo.USER && currentVideo.USER.user_photo) {
      setUserPhoto(currentVideo.USER.user_photo);
    }
  }, [currentVideo]);
  console.log("VideoInfo currentVideo", currentVideo);

  return (
    <>
      <div className="video_info">
        {/* <div>
   
        </div> */}
        <div>
          <div className="left">
            {/* {currentVideo.category_level2_no === 6 && (
              <img
                className="emergenza_badge"
                src={emergenzaBadge}
                alt="emergenza_badge"
              />
            )} */}
            <div className="title_group">
              <div className="video_info_title">
                <div>
                  <CategoryCircle category={currentVideo.category_level2_no} />
                </div>
                <div
                  stlye={{
                    lineHeight: "41px"
                  }}
                >
                  {currentVideo.title}
                  {currentVideo.category_level2_no === 6 && (
                    <span className="team_name">{currentVideo.team_name}</span>
                  )}
                </div>
              </div>
              <div className="view_like_date">
                <div>
                  <span className="content_title">조회수</span>
                  <span>
                    {currentVideo.countViewVideo
                      ? numberWithCommas(currentVideo.countViewVideo)
                      : 0}
                  </span>
                </div>
                <div>
                  <span className="content_title">좋아요</span>
                  <span>
                    {currentVideo.countLikeVideo
                      ? numberWithCommas(currentVideo.countLikeVideo)
                      : 0}
                  </span>
                </div>
                <div>
                  {currentVideo.created_at
                    ? currentVideo.created_at.substr(0, 10).replace(/-/g, ".")
                    : ""}
                </div>
              </div>
            </div>
          </div>
          {currentVideo.active_log_no
            ? currentVideo.video_no && (
                <button onClick={() => _handleLike()} className="bg_grey">
                  <img
                    src={personFollow}
                    alt="login_white"
                    width="20px"
                    height="20px"
                    className="mr_14px va_m"
                  />
                  <span>좋아요</span>
                </button>
              )
            : currentVideo.video_no && (
                <button onClick={() => _handleLike("like")}>
                  <img
                    src={like_img}
                    alt="like_img"
                    width="25px"
                    height="22px"
                    className="like_img"
                  />
                  <span>좋아요</span>
                </button>
              )}
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <div className="profile_img">
            <img src={!isOfficial ? userPhoto : logo} onLoad={_imgOnLoad} />
          </div>
          {!isOfficial && <div className="rank">- 위</div>}
        </div>
        <div className="right">
          <span className="name">
            {!isOfficial && currentVideo && currentVideo.USER
              ? currentVideo.USER.nickname
              : ""}
            {isOfficial && "OFFICIAL"}
          </span>
          {!isOfficial && currentVideo && currentVideo.USER && (
            <Link
              href="/user/[user_no]"
              as={`/user/${currentVideo.USER.user_no}`}
            >
              <button>프로필보기</button>
            </Link>
          )}
          {<div className="noti">{currentVideo.description}</div>}
          <div className="dreamer"></div>
        </div>
      </div>
      <style jsx>{`
        .emergenza_badge {
          width: 200px;
          margin-right: 22px;
        }
        .title_group {
          display: inline-block;
          vertical-align: top;
        }
        .video_info {
          width: 1365px;
          height: 115px;
          position: relative;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 30px;
        }
        .video_info .left .video_info_title {
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 15px;
        }

        .video_info .left .video_info_title div {
          display: inline-block;
          vertical-align: middle;
        }
        .video_info .left .video_info_title div:first-of-type {
          margin-right: 10px;
        }
        .video_info_title .team_name {
          font-size: 20px;
          margin-left: 10px;
        }
        .video_info .left .view_like_date {
          display: inline-block;
          font-size: 17px;
          font-weight: 400;
          color: #878792;
        }
        .video_info .left .view_like_date div {
          display: inline-block;
          position: relative;
          margin-right: 40px;
        }
        .video_info .left .view_like_date div::before {
          position: absolute;
          content: "";
          top: 50%;
          right: -20px;
          border-left: 2px solid #878792;
          height: 2px;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
        .video_info .left .view_like_date div:last-child::before {
          border-left: none;
        }
        .video_info .left .view_like_date .content_title {
          margin-right: 10px;
        }
        .video_info button {
          width: 140px;
          height: 57px;
          background-color: #f38400;
          border: none;
          border-radius: 30px;
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
        }
        .video_info button img {
          width: 25px;
          height: 22px;
          display: inline-block;
          margin-right: 20px;
          vertical-align: middle;
        }
        .video_info button span {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
        }

        .bottom .left {
          margin-right: 20px;
          display: inline-block;
          vertical-align: top;
        }
        .bottom .left .profile_img {
          position: relative;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin-right: 15px;
          margin-bottom: 15px;
          overflow: hidden;
        }
        .profile_img > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .bottom .left .rank {
          width: 70px;
          height: 25px;
          background-color: #f38400;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          position: relative;
          transform: skew(-9deg);
        }
        .bottom .right {
          display: inline-block;
        }
        .bottom .right .name {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          margin-right: 15px;
        }
        .bottom .right button {
          width: 110px;
          height: 38px;
          display: inline-block;
          color: #fff;
          font-weight: 400;
          font-size: 16px;
          border: 2px solid #fff;
          background-color: inherit;
          margin-bottom: 10px;
        }
        button:hover {
          cursor: pointer;
        }
        .bottom .right .noti {
          width: 1265px;
          word-break: break-all;

          white-space: pre-line;
          font-size: 17px;
          color: #fff;
          font-weight: 400;
          margin-bottom: 10px;
        }
        .bottom .right .dreamer span {
          display: inline-block;
          font-size: 17px;
          color: #fff;
          font-weight: 400;
        }
        .bottom .right .dreamer span:nth-child(2) {
          margin: 0 10px;
        }
        .bg_grey {
          background-color: #39394a !important;
        }
      `}</style>
    </>
  );
};

VideoInfo.propTypes = {
  likeVideoList: PropTypes.array
};

export default VideoInfo;
