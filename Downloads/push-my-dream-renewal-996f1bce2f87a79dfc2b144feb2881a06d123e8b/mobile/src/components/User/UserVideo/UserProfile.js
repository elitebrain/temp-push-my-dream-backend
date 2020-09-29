import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import arrow_left from "public/assets/icon/arrow_left(white).svg";
import loginMain from "public/assets/icon/login.svg";
import personCircle from "public/assets/image/person_circle.png";
import personFollow from "public/assets/image/person_follow.png";
import facebookIco from "public/assets/image/facebook_ico.png";
import instagramIco from "public/assets/image/instagram_ico.png";
import youtubeIco from "public/assets/image/youtube_ico.png";
import blogIco from "public/assets/image/blog_ico.png";
import twitterIco from "public/assets/image/twitter_ico.png";

import { numberWithCommas, ymdToDotYMD, imgOnLoad } from "shared/functions";

import Button from "components/Common/Button";
import RankBadge from "components/Common/RankBadge";

const UserProfile = (props) => {
  const { followingList, user, currentUser, handleFollow } = props;
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const [fontSize, setFontSize] = useState("23px");
  const {
    user_photo,
    nickname,
    user_name,
    birthdate,
    countFollowUser,
    countLikeUser,
    introduce,
    facebook_url,
    instagram_url,
    youtube_url,
    blog_url,
    twitter_url,
  } = currentUser;
  const rank = "-";
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  useEffect(() => {
    // fontSize 12px ~ 23px nickname 길이에 따라 설정
    if (nickname.length > 16) {
      setFontSize("12px");
    } else if (nickname.length > 5) {
      setFontSize(`${28 - nickname.length}px`);
    }
  }, [nickname]);
  return (
    <div className="container">
      <div className="wrapper_top">
        <div className="user_photo_frame">
          <img src={user_photo} alt="user_photo" onLoad={_imgOnLoad} />
        </div>
        <div className="user_profile">
          <h1 className="mb_5px">
            <span className="va_m nickname">{nickname}</span>
            <RankBadge rank={rank} />
          </h1>
          <h2 className="mb_5px">
            {/* {user_name} */}
            {/* ({birthdate ? ymdToDotYMD(birthdate.substr(2)) : ""}) */}
          </h2>
          <h2 className="fc_grey">
            <span className="follower">
              <span>{countFollowUser > 1 ? "Followers" : "Follower"}</span>
              <span>
                {countFollowUser ? numberWithCommas(countFollowUser) : "0"}
              </span>
            </span>
          </h2>
        </div>
        <div>
          <div className="sns_group">
            {facebook_url && (
              <a href={facebook_url} target="_blank">
                <img src={facebookIco} alt="facebook_ico" />
              </a>
            )}
            {instagram_url && (
              <a href={instagram_url} target="_blank">
                <img src={instagramIco} alt="instagram_ico" />
              </a>
            )}
            {youtube_url && (
              <a href={youtube_url} target="_blank">
                <img src={youtubeIco} alt="youtube_ico" />
              </a>
            )}
            {blog_url && (
              <a href={blog_url} target="_blank">
                <img src={blogIco} alt="blog_ico" />
              </a>
            )}
            {twitter_url && (
              <a href={twitter_url} target="_blank">
                <img src={twitterIco} alt="twitter_ico" />
              </a>
            )}
          </div>
          {followingList &&
          followingList.filter((v) => v === currentUser.user_no).length !==
            0 ? (
            <Button
              className="bg_grey d_inline-block ml_20px v_md"
              handleClick={() => handleFollow("unfollow")}
            >
              <img
                src={personFollow}
                alt="login_white"
                width="14px"
                height="14px"
                className="mr_10px va_m"
              />
              <span className="va_m">팔로잉</span>
            </Button>
          ) : (
            <Button
              className="d_inline-block ml_20px v_md"
              handleClick={() => handleFollow("follow")}
            >
              <img
                src={loginMain}
                alt="login_white"
                width="14px"
                height="14px"
                className="mr_10px va_m"
              />
              <span className="va_m">팔로우</span>
            </Button>
          )}
        </div>
      </div>
      {introduce && introduce.length > 0 && (
        <div className="wrapper_bottom">
          <p>{introduce}</p>
        </div>
      )}
      <style jsx>{`
        .nickname {
          font-size: ${fontSize};
        }
        h1 {
          font-size: 13px;
        }
        h2 {
          font-size: 17px;
        }
        .mr_10px {
          margin-right: 10px;
        }
        .va_m {
          vertical-align: middle;
        }
        .mb_10px {
          margin-bottom: 10px;
        }
        .mb_5px {
          margin-bottom: 5px;
        }
        .fc_grey {
          color: #878792;
        }
        .wrapper_top {
          color: #fff;
          margin-bottom: 15px;
        }
        .wrapper_top .user_photo_frame {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;
        }
        .user_photo_frame > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .user_profile {
          width: calc(100% - 95px);
        }
        .wrapper_top > img,
        .wrapper_top > div {
          display: inline-block;
          vertical-align: middle;
        }
        .wrapper_top > div:last-child {
          margin-top: 15px;
          width: 100%;
          text-align: right;
        }
        .wrapper_bottom {
          width: 100%;
          margin-top: 70px;
          border-radius: 10px;
          background-color: #141418;
          color: #fff;
          font-size: 13px;
        }
        .wrapper_bottom > p {
          white-space: pre-line;
          line-height: 20px;
          padding: 20px 20px;
        }
        .sns_group {
          display: inline-block;
          vertical-align: middle;
        }
        .sns_group > a {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-left: 7px;
        }
        .sns_group > a > img {
          width: 100%;
          height: 100%;
        }
        .follower {
          position: relative;
          margin-right: 24px;
        }
        .follower > span:first-child {
          margin-right: 5px;
        }
        /* .user_title {
          height: 30px;
          position: relative;
          margin-bottom: 17px;
        }
        .user_title span {
          display: inline-block;
        }
        .user_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 0;
          transform: translateY(-50%);
          top: 50%;
        }
        .user_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        } */
        @media (max-width: 425px) {
          h1 {
            font-size: 23px;
            margin-bottom: 5px;
          }
          h2 {
            font-size: 13px;
            margin-bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  handleFollow: PropTypes.func,
};

export default UserProfile;
