import React, { useState } from "react";
import PropTypes from "prop-types";

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

const UserProfile = props => {
  const { followingList, user, currentUser, handleFollow } = props;
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
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
    twitter_url
  } = currentUser;
  const rank = "-";
  const _imgOnLoad = e => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  return (
    <div className="container">
      <div className="wrapper_top">
        <div className="user_photo_frame">
          <img src={user_photo} alt="user_photo" onLoad={_imgOnLoad} />
        </div>
        <div>
          <h1 className="mb_10px">
            <span className="va_m">{nickname}</span>
            <RankBadge rank={rank} />
          </h1>
          <h2 className="mb_10px">{user_name}</h2>
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
          followingList.filter(v => v === currentUser.user_no).length !== 0 ? (
            <Button
              className="bg_grey"
              handleClick={() => handleFollow("unfollow")}
            >
              <img
                src={personFollow}
                alt="login_white"
                width="20px"
                height="20px"
                className="mr_14px va_m"
              />
              <span className="va_m">팔로잉</span>
            </Button>
          ) : (
            <Button handleClick={() => handleFollow("follow")}>
              <img
                src={loginMain}
                alt="login_white"
                width="20px"
                height="20px"
                className="mr_14px va_m"
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
        h1 {
          font-size: 28px;
        }
        h2 {
          font-size: 17px;
        }
        .mr_14px {
          margin-right: 14px;
        }
        .va_m {
          vertical-align: middle;
        }
        .mb_10px {
          margin-bottom: 10px;
        }
        .fc_grey {
          color: #878792;
        }
        .container {
          padding-top: 185px;
        }
        .wrapper_top {
          color: #fff;
          margin-bottom: 30px;
        }
        .wrapper_top .user_photo_frame {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 30px;
        }
        .user_photo_frame > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .wrapper_top > div {
          display: inline-block;
          vertical-align: middle;
        }
        .wrapper_top > div:last-child {
          margin-top: 29px;
          float: right;
        }
        .wrapper_bottom {
          width: 100%;
          border-radius: 10px;
          background-color: #141418;
          color: #fff;
          font-size: 16px;
        }
        .wrapper_bottom > p {
          white-space: pre-line;
          line-height: 28px;
          padding: 24px 30px;
        }
        .sns_group {
          display: inline-block;
          vertical-align: middle;
        }
        .sns_group img {
          display: inline-block;
          margin-right: 11px;
        }
        .sns_group img:last-child {
          margin-right: 40px;
        }
        .follower {
          position: relative;
          margin-right: 24px;
        }
        .follower > span:first-child {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  handleFollow: PropTypes.func,
  followingList: PropTypes.array
};

export default UserProfile;
