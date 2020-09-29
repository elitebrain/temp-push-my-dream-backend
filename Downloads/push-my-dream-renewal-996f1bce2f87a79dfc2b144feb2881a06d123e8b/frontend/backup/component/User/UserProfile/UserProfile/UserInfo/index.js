import React from "react";

import loginMain from "public/assets/icon/login.svg";
import personFollow from "public/assets/image/person_follow.png";
import profile_badge from "public/assets/image/profile_badge.png";
import profile_img_bg from "public/assets/image/profile_img_bg.png";

import Button from "components/Common/Button";
import Avatar from "components/Common/Avatar";

const UserInfo = () => {
  return (
    <div className="User_info_container">
      <div className="wrapper_top">
        <div className="user_photo_frame">
          <Avatar
            photo={"http://via.placeholder.com/500x300"}
            style={{
              width: "80px",
              height: "80px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          />
        </div>
        <div className="user_profile">
          <div className="profile_top">
            <div className="badge_container">
              <div className="badge">A</div>
              <div className="badge">S</div>
            </div>
            <div className="follow_button">
              <Button
                style={{
                  width: "95px",
                  height: "30px",
                  fontSize: "12px",
                  padding: "0 8px"
                }}
              >
                <img
                  src={personFollow}
                  alt="login_white"
                  width="14px"
                  height="14px"
                  className="mr_10px va_m"
                />
                Following
              </Button>
              {/* <Button
            className="bg_grey"
            style={{
              // width: "85px",
              height: "30px",
              backgroundColor: "inherit",
              border: "1px solid #fff",
              fontSize: "12px",
              padding: "0 8px"
            }}
          >
            <img
              src={loginMain}
              alt="login_white"
              width="14px"
              height="14px"
              className="mr_10px va_m"
            />
            <span className="va_m">Follow</span>
          </Button> */}
            </div>
          </div>
          <h1 className="mb_5px">
            <span className="va_m">Time Machine Circuit</span>
          </h1>
          <h2 className="fc_grey">
            <span className="follower">
              <span>View</span>
              <span>999m</span>
            </span>
            <span className="follower">
              <span>Like</span>
              <span>999m</span>
            </span>
            <span className="follower">
              <span>Fan</span>
              <span>999k</span>
            </span>
          </h2>
        </div>
      </div>
      <style jsx>{`
        h1 {
          font-size: 23px;
        }
        h2 {
          font-size: 13px;
        }
        .mb_5px {
          margin-bottom: 5px;
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
        .wrapper_top > img,
        .wrapper_top > div {
          display: inline-block;
          vertical-align: middle;
        }
        .wrapper_top .user_profile {
          width: calc(100% - 95px);
        }
        .User_info_container .user_photo_frame {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 5px;
          background-image: url(${profile_img_bg});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
        .user_photo_frame > img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .user_profile {
          width: calc(100% - 95px);
        }
        .user_profile .badge_container {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .user_profile .badge_container .badge {
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-image: url(${profile_badge});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
          margin-right: 5px;
        }
        .user_profile .badge_container .badge.badge:last-child {
          margin-right: 0;
        }
        .user_profile .profile_top {
          height: 36px;
          position: relative;
        }
        .user_profile .profile_top .follow_button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .follower {
          margin-right: 7px;
        }
        .follower:last-child {
          margin: 0;
        }
        .follower span:first-child {
          margin-right: 5px;
        }
        .follower span:last-child {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
