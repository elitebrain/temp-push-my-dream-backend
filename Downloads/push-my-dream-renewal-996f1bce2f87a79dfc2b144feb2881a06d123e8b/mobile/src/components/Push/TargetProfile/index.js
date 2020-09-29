import React from "react";
import PropTypes from "prop-types";

import defaultUser from "public/assets/image/default_user.png";

import {
  COLOR_696C8C,
  GRADIENT_2F3354_040221,
  COLOR_979CCA,
} from "shared/constants/colors";

import { numberWithCommasAndCheckNone } from "shared/functions";

const TargetProfile = ({ season, targetUser, totalPush, myPush }) => {
  return (
    <div className="profile">
      <div className="seasonContainer">
        <div className="category">
          <img
            src={season.CATEGORY_LEVEL2.category_level2_icon}
            alt="category_img"
            width="75px"
            height="30px"
          />
        </div>
        <h2 className="season">
          <span className="title">
            {season.CATEGORY_LEVEL3.category_level3}
          </span>
          <span className="dash">-</span>
          <span className="ordinalNumber">
            {`${season.CATEGORY_LEVEL4.ordinalNumber}차`}
          </span>
        </h2>
      </div>
      <div className="info">
        <picture>
          {targetUser && targetUser.user_photo ? (
            <img
              src={targetUser.user_photo}
              alt="profile_img"
              // onLoad={(e) =>
              //   imgOnLoad(e, setProfileWidth, setProfileHeight)
              // }
            />
          ) : (
            <img
              src={defaultUser}
              alt="profile_img"
              // onLoad={(e) =>
              //   imgOnLoad(e, setProfileWidth, setProfileHeight)
              // }
            />
          )}
        </picture>
        <div className="profile_text">
          <div className="name">{targetUser ? targetUser.nickname : ""}</div>
          <div className="push_info">
            <span className="push_type">Total PUSH</span>
            <span className="push_value">
              {numberWithCommasAndCheckNone(totalPush)}
            </span>
          </div>
          <div className="push_info">
            <span className="push_type">내가 한 PUSH</span>
            <span className="push_value">
              {numberWithCommasAndCheckNone(myPush)}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile {
          /* width: calc(100% + 40px);
          margin-left: -20px; */
          background-image: ${GRADIENT_2F3354_040221(90)};
        }

        .profile .seasonContainer {
          padding: 12px 20px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          position: relative;
        }
        .profile .seasonContainer .category {
          position: absolute;
          right: 20px;
          top: 20px;
        }
        .profile .seasonContainer .season {
          position: absolute;
          left: 20px;
          top: 15px;
          display: flex;
          align-items: center;
          font-family: Montserrat;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          color: ${COLOR_979CCA};
        }
        .profile .seasonContainer .season span {
          display: inline-block;
          vertical-align: middle;
        }
        .profile .seasonContainer .season .dash {
          margin: 0 5px;
        }
        .profile .seasonContainer .season .ordinalNumber {
          display: inline-block;
          background-color: ${COLOR_979CCA};
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          color: #000;
          text-align: center;
          font-size: 10px;
        }

        .profile .info {
          padding: 30px 15px 20px 20px;
        }

        .profile .info > picture {
          position: relative;
          display: inline-block;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
        }
        .profile .info > picture > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          /*width: {profileWidth};*/
          /*height: {profileHeight};*/
        }
        .profile .info > .profile_text {
          padding: 5px 0px 5px 20px;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          width: calc(100% - 90px);
          font-size: 12px;
          color: #aaa;
        }
        .profile_text > .name {
          display: inline-block;
          vertical-align: middle;
          font-weight: bold;
          font-size: 18px;
          color: #fff;

          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: 180px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .profile_text > .push_info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .profile_text > .push_info .push_type {
          font-family: Montserrat;
          font-weight: normal;
          font-size: 12px;
          line-height: 17px;
          color: ${COLOR_696C8C};
        }

        .profile_text > .push_info .push_value {
          font-weight: bold;
          font-size: 18px;
          line-height: 20px;
          text-align: right;
          color: #fff;
        }

        @media screen and (max-width: 374px) {
          .profile_text > .push_info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: initial;
          }
        }
      `}</style>
    </div>
  );
};

export default TargetProfile;
