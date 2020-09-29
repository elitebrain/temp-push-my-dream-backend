import React, { useContext } from "react";

import { UserContext } from "containers/User/UserContainer";

import { numberWithKMB } from "shared/functions";

import UserPhoto from "../../../common/UserPhoto";
import UserNickName from "../../../common/UserNickName";
import FollowButton from "../../../common/FollowButton";

import facebook from "public/assets/icon/facebook_ico(white).svg";
import insta from "public/assets/icon/insta_ico(white).svg";
import youtube from "public/assets/icon/youtube_ico(white).svg";
import twitter from "public/assets/icon/twitter_ico(white).svg";

const UserInfo = () => {
  const { currentUser, handleFollow, followLoading } = useContext(UserContext);
  const {
    user_photo,
    nickname,
    facebook_url,
    instagram_url,
    youtube_url,
    twitter_url,
    countFollowUser,
    countLike,
  } = currentUser;
  console.log("currentUser", currentUser, user_photo);
  return (
    <div className="User_info_container">
      <div className="wrapper_top">
        <UserPhoto user_photo={user_photo} />
        <div className="user_profile">
          <UserNickName nickname={nickname} />
          {/* <div className="height_width">
            <span className="mr_10px">Height 175</span>
            <span>Width 50</span>
          </div> */}
          <div className="sns_btn">
            {facebook_url && (
              <div onClick={() => window.open(facebook_url)}>
                <img src={facebook} alt="facebook" />
              </div>
            )}
            {instagram_url && (
              <div onClick={() => window.open(instagram_url)}>
                <img src={insta} alt="insta" />
              </div>
            )}
            {youtube_url && (
              <div onClick={() => window.open(youtube_url)}>
                <img src={youtube} alt="youtube" />
              </div>
            )}
            {twitter_url && (
              <div onClick={() => window.open(twitter_url)}>
                <img src={twitter} alt="twitter" />
              </div>
            )}
          </div>
          <h2 className="fc_grey follow">
            <span className="count">
              <span>Fans</span>
              <span>{numberWithKMB(countFollowUser)}</span>
            </span>
            {/* <span className="count">
              <span>Likes</span>
              <span>{numberWithKMB(countLike)}</span>
            </span> */}
          </h2>
          <FollowButton
            userNo={currentUser.user_no}
            handleFollow={handleFollow}
            followLoading={followLoading}
          />
        </div>
      </div>
      <style jsx>{`
        h2 {
          font-size: 12px;
        }
        .mr_10px {
          margin-right: 10px;
        }
        .va_m {
          vertical-align: middle;
        }
        .fc_grey {
          color: #878792;
        }

        .wrapper_top {
          color: #fff;
          margin-bottom: 15px;
        }
        /* .wrapper_top > img,
        .wrapper_top > div {
          display: inline-block;
          vertical-align: middle;
        } */
        .user_profile {
          color: #fff;
          width: calc(100% - 95px);
          text-align: center;
          position: relative;
        }
        .height_width {
          font-size: 9px;
          color: #fff;
          font-weight: normal;
          margin-bottom: 9px;
        }
        .height_width span {
          display: inline-block;
        }
        .user_profile {
          width: calc(100% - 95px);
          margin: 0 auto;
        }
        .sns_btn {
          margin-top: 15px;
          margin-bottom: 5px;
        }
        .sns_btn div {
          position: relative;
          width: 26px;
          height: 26px;
          line-height: 26px;
          display: inline-block;
          vertical-align: middle;
          background: linear-gradient(180deg, #2f3354 0%, #040221 100%);
          border-radius: 6px;
          margin-right: 10px;
        }
        .sns_btn div:hover {
          cursor: pointer;
        }
        .sns_btn div img {
          position: absolute;
          width: 16px;
          height: 16px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .sns_btn div:last-child {
          margin-right: 0;
        }
        .follow .count:first-child {
          margin-right: 20px;
        }
        .follow .count span:first-child {
          margin-right: 3px;
        }

        @media (min-width: 2560px) {
          .height_width {
            font-size: 15px;
          }
          .sns_btn div {
            width: 25px;
            height: 25px;
            line-height: 25px;
          }
          .sns_btn div img {
            width: 15px;
            height: 15px;
          }
          .follow .count {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
