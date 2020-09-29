import React, { useState, useContext } from "react";
import Router from "next/router";
import PropTypes from "prop-types";

import { ViewVideoContext } from "containers/Video/ViewVideoContainer";

import personCircle from "public/assets/image/person_circle.png";
import logo from "public/assets/icon/logo_bird_w.svg";
import RankButtonGroup from "../RankButtonGroup/RankButtonGroup";
import { imgOnLoad } from "shared/functions";

const VideoInfo = (props) => {
  const {
    currentVideo,
    setIsViewComment,
    handleLike,
    realIdx,
    isOfficial,
    isPush,
  } = props;
  const {
    title,
    description,
    category_level2_no,
    countViewVideo,
    countLikeVideo,
    created_at,
    USER,
    team_name,
  } = currentVideo;

  const [imgWidth, setImgWidth] = useState("100%");
  const [imgHeight, setImgHeight] = useState("auto");
  const { setIsViewUserProfile, toggleViewBottom, isViewBottom } = useContext(
    ViewVideoContext
  );
  const _imgOnLoad = (e) => {
    console.log("_imgOnLoad ~~~~~~~", e);
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  const _handleProfile = () => {
    if (location.pathname === "/video/user") {
      Router.back();
    } else {
      // realIdx
      // Router.push(`/user?userNo=${USER.user_no}`);
      setIsViewUserProfile();
    }
  };
  return (
    <>
      <div className="video_info">
        {/* <div className="toggle_cover" onClick={() => toggleViewBottom()} /> */}
        <div className="VideoUserInfo">
          <div className="name_profile_btn">
            <div className="profile_img">
              <img
                src={
                  isOfficial
                    ? logo
                    : USER && USER.user_photo
                    ? USER.user_photo
                    : personCircle
                }
                alt="user_photo"
                onLoad={_imgOnLoad}
              />
            </div>
            <div className="info_like_box">
              <div className="name_song_info">
                {isOfficial
                  ? "OFFICIAL"
                  : category_level2_no === 6
                  ? team_name
                  : USER
                  ? USER.nickname
                  : ""}
              </div>
              <div className="view_like_date">
                {/* <div>
                <span className="content_title">조회수</span>
                <span>{countViewVideo}</span>
              </div> */}
                {/* <div>
                <span className="content_title">좋아요</span>
                <span>{countLikeVideo}</span>
              </div> */}
                <div>
                  {created_at
                    ? created_at.substr(0, 10).replace(/-/g, ".")
                    : ""}
                </div>
              </div>
            </div>
            {/* {!isOfficial && (
            <Button
              className="bg_transparent br_none"
              style={{
                width: "80px",
                height: "28px",
                fontSize: "12px",
                position: "absolute",
                right: "20px",
                top: "50%",
                color: "#fff",
                border: "1px solid #888",
                transform: "translateY(-50%)"
              }}
              handleClick={() => _handleProfile()}
              // handleClick={() => setIsViewUserProfile()}
            >
              프로필 보기
            </Button>
          )} */}
          </div>
          <div className="user_profile">
            {/* <div className="category">
            <CategoryCircle category={category_level2_no} />
          </div>
          <div className="title">{title}</div> */}
            <div className="video_noti">
              <div className="noti">{description}</div>
            </div>
          </div>
        </div>
        {/* {isViewBottom && ( */}
        <RankButtonGroup
          isPush={isPush}
          setIsViewComment={setIsViewComment}
          handleLike={handleLike}
          currentVideo={currentVideo}
          isOfficial={isOfficial}
        />
        {/* )} */}
      </div>
      <style jsx>{`
        .toggle_cover {
          position: absolute;
          width: 100vw;
          height: calc(100vh - 50px);
          bottom: 150px;
          left: 0;
          z-index: 2;
        }

        .VideoUserInfo {
          position: absolute;
          left: 0;
          bottom: 0;
        }

        .video_info {
          width: 100%;
          height: 335px;
          position: relative;
        }
        .info_like_box {
          position: absolute;
          left: 70px;
          top: 50%;
          transform: translateY(-50%);
        }
        .video_info .name_profile_btn {
          position: relative;
          width: calc(100vw - 130px);
          height: 60px;
          z-index: 3;
        }

        .video_info .category {
          display: inline-block;
          vertical-align: top;
          margin-right: 5px;
          margin-top: 3px;
        }
        .video_info .name_profile_btn .name_song_info {
          /* width: 150px;  제목옆에 프로필보기 생기면 width값 넣어야함 주석 풀 것! */
          /* position: absolute; */
          /* left: 70px; */
          /* transform: translateY(-50%); */
          /* top: 50%; */
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          overflow: hidden;
          white-space: pre-line;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 20px;
        }
        .title {
          display: inline-block;
          vertical-align: top;
          width: calc(100% - 40px);
          color: #fff;
          top: 33px;
          left: 40px;
          font-size: 14px;
        }
        .user_profile {
          width: calc(100vw - 150px);
          padding-left: 20px;
          margin-bottom: 25px;
        }

        .profile_img {
          position: absolute;
          width: 45px;
          height: 45px;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          overflow: hidden;
        }
        .profile_img > img {
          width: 100%;
          height: 100%;

          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);

          border-radius: 50%;
        }
        .video_info .user_profile .video_noti {
          width: 100%;
          display: inline-block;
          vertical-align: middle;
          margin-top: 6px;
        }
        .video_info .user_profile .noti {
          width: 100%;
          color: #fff;
          white-space: pre-line;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 12px;
          line-height: 18px;
        }

        .video_info .view_like_date {
          font-size: 10px;
          color: #fff;
        }
        .video_info .view_like_date div {
          display: inline-block;
          position: relative;
          margin-right: 13px;
        }
        .video_info .view_like_date div::before {
          position: absolute;
          content: "";
          top: 50%;
          right: -7px;
          border-left: 2px solid #878792;
          height: 2px;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
        .video_info .view_like_date div:last-child::before {
          border-left: none;
        }
        .video_info .view_like_date .content_title {
          margin-right: 5px;
        }
        @media (max-width: 375px) {
          .video_info .user_profile .noti {
            font-size: 10px;
          }
        }
        @media (max-width: 320px) {
          .user_profile .profile_img {
            margin-right: 5px;
          }
          .video_info .user_profile .noti {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
};

VideoInfo.propTypes = {
  isPush: PropTypes.bool.isRequired,
};

export default VideoInfo;
