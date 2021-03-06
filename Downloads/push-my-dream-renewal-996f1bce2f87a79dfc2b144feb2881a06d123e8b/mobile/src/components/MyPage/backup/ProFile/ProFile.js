import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import gear_ico from "public/assets/icon/gear.svg";
import settingIcon from "public/assets/image/icon_setting.png";
import profile_img from "public/assets/image/person_circle.png";

import facebook_ico from "public/assets/image/facebook_ico.png";
import instagram_ico from "public/assets/image/instagram_ico.png";
import youtube_ico from "public/assets/image/youtube_ico.png";
import blog_ico from "public/assets/image/blog_ico.png";
import twitter_ico from "public/assets/image/twitter_ico.png";
import { ymdToDotYMD, imgOnLoad, numberWithCommas } from "shared/functions";

const ProFile = () => {
  const {
    nickname,
    user_name,
    birthdate,
    phone,
    user_photo,
    count_follower,
    count_like,
    facebook_url,
    instagram_url,
    youtube_url,
    blog_url,
    twitter_url,
  } = useSelector((state) => state.user);
  const [imgWidth, setImgWidth] = useState("auto");
  const [imgHeight, setImgHeight] = useState("auto");
  const _imgOnLoad = (e) => {
    imgOnLoad(e, setImgWidth, setImgHeight);
  };
  return (
    <div className="profile">
      <div className="photo_frame">
        <div className="profile_img">
          <img src={user_photo} alt="user_photo" onLoad={_imgOnLoad} />
        </div>
        <div className="rank"> - 위</div>
      </div>
      <div className="nickname">
        <div className="nick">{nickname}</div>
        <Link href="/mypage/edit">
          <div className="gear_ico">
            <img src={settingIcon} alt="gear_ico" width="100%" height="100%" />
          </div>
        </Link>
      </div>
      <div className="name_phone">
        <div className="name_birth">
          <span>{user_name}</span>
          <span>({birthdate ? ymdToDotYMD(birthdate.substr(2)) : ""})</span>
        </div>
        <div className="phone">{phone ? phone.replace(/-/g, "") : ""}</div>
      </div>
      <div className="followers_likes">
        <div className="follower">
          <span>{count_follower > 1 ? "Followers" : "Follower"}</span>
          <span>{count_follower ? numberWithCommas(count_follower) : "0"}</span>
        </div>
        {/* <div className="dot" />
        <div className="likes">
          <span>Likes</span>
          <span>543</span>
        </div> */}
      </div>
      <div className="sns">
        {facebook_url && (
          <a href={facebook_url} target="_blank">
            <img src={facebook_ico} alt="facebook_ico" />
          </a>
        )}
        {instagram_url && (
          <a href={instagram_url} target="_blank">
            <img src={instagram_ico} alt="instagram_ico" />
          </a>
        )}
        {youtube_url && (
          <a href={youtube_url} target="_blank">
            <img src={youtube_ico} alt="youtube_ico" />
          </a>
        )}
        {blog_url && (
          <a href={blog_url} target="_blank">
            <img src={blog_ico} alt="blog_ico" />
          </a>
        )}
        {twitter_url && (
          <a href={twitter_url} target="_blank">
            <img src={twitter_ico} alt="twitter_ico" />
          </a>
        )}
      </div>
      <style jsx>{`
        .profile {
          text-align: center;
          z-index: 1;
        }
        .profile .rank {
          width: 65px;
          height: 18px;
          line-height: 18px;
          background-color: #f38400;
          color: #fff;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
          transform: skew(-9deg);
          position: absolute;
          left: -59px;
          top: 50%;
        }
        .photo_frame {
          position: relative;
          width: 81px;
          height: 81px;
          margin: auto;
        }
        .profile .profile_img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          margin: 0 auto;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }
        .profile .profile_img > img {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
          width: ${imgWidth};
          height: ${imgHeight};
        }
        .profile .nickname {
          margin-bottom: 10px;
        }
        .profile .nickname .nick {
          font-size: 23px;
          color: #fff;
          font-weight: bold;
          display: inline-block;
          margin-right: 7px;
        }
        .profile .nickname .gear_ico {
          width: 17px;
          height: 17px;
          display: inline-block;
        }
        .profile .name_phone {
          margin-bottom: 7px;
        }
        .profile .name_phone .name_birth {
          width: 120px;
          line-height: 10px;
          font-size: 13px;
          color: #fff;
          margin-right: 7px;
          border-right: 1px solid #fff;
          display: inline-block;
        }
        .profile .name_phone .name_birth span {
          font-weight: 400;
          display: inline-block;
        }
        .profile .name_phone .name_birth span:first-child {
          margin-right: 5px;
        }
        .profile .name_phone .phone {
          /* text-decoration: none; */

          display: inline-block;
          font-size: 13px;
          font-weight: 400;
          color: #fff;
        }
        .profile .followers_likes {
          font-size: 13px;
          font-weight: 400;
          color: #878792;
          margin-bottom: 20px;
        }
        .profile .followers_likes .follower {
          display: inline-block;
        }
        .profile .followers_likes .dot {
          width: 3px;
          height: 3px;
          background-color: #878792;
          margin: 0 10px;
          vertical-align: middle;
          display: inline-block;
          border-radius: 50%;
        }
        .profile .followers_likes .likes {
          display: inline-block;
        }
        .profile .followers_likes .follower::before {
          background-color: #f38400;
          font-weight: bold;
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          position: relative;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          margin-right: 10px;
        }
        .profile .followers_likes .follower span:first-child,
        .profile .followers_likes .likes span:first-child {
          margin-right: 5px;
        }
        .profile .sns {
          margin-bottom: 20px;
        }
        .profile .sns img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          display: inline-block;
        }
        .profile .sns img:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  );
};

export default ProFile;
