import React from "react";

import user_img from "public/assets/image/gate_producer_img.png";
import {
  COLOR_696C8C,
  COLOR_979CCA,
  GRADIENT_00F1B4_D53CF5,
} from "shared/constants/colors";
import Avatar from "components/Common/Avatar";

const UserItems = () => {
  return (
    <div className="UserItems_container">
      {/* 320해상도 다시 확인할것 */}
      <div className="user_img">
        <Avatar photo={user_img} width="100%" height="100%" />
      </div>
      <div className="user_info">
        <div className="name_push">
          <div className="name">이름이열글자까지라니까</div>
          <div className="push">
            <span>5,342,000</span>
            <span>PUSH</span>
          </div>
        </div>
        <div className="count">
          <div className="count_box">
            <div className="count_content">
              <span>Videos</span>
              <span>207</span>
            </div>
            <div className="count_content">
              <span>Views</span>
              <span>1K</span>
            </div>
          </div>
          <div className="count_box">
            {/* <div className="count_content">
              <span>Likes</span>
              <span>1.2K</span>
            </div> */}
            <div className="count_content">
              <span>Fans</span>
              <span>210</span>
            </div>
          </div>
        </div>
        <div className="recent_participation">
          <div className="title">최근 참여</div>
          <div className="participation">
            <span>진행중</span>
            <span>PUSH MY APPLE SEASON #2</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .UserItems_container {
          font-size: 12px;
          margin-bottom: 40px;
          padding: 20px 0;
          border-bottom: 0.5px solid #888;
        }
        .user_img {
          width: 65px;
          height: 65px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: top;
        }
        .user_info {
          display: inline-block;
          vertical-align: top;
        }
        .name_push {
          margin-bottom: 5px;
        }
        .name_push .name {
          display: inline-block;
          vertical-align: middle;
          font-weight: bold;
          font-size: 14px;
          color: #fff;
          margin-right: 10px;

          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          width: 140px;
          overflow: hidden;
        }
        .name_push .push {
          display: inline-block;
          vertical-align: middle;
        }
        .name_push .push span:first-child {
          display: inline-block;
          vertical-align: middle;
          font-weight: bold;
          font-size: 14px;
          color: #fff;
          margin-right: 5px;
        }

        .name_push .push span:last-child {
          display: inline-block;
          vertical-align: bottom;
          font-weight: bold;
          color: #fff;
        }
        .count {
          line-height: 15px;
          margin-bottom: 5px;
        }
        .count .count_content {
          line-height: 10px;
          display: inline-block;
          margin-right: 15px;
        }

        .count .count_content:last-child {
          margin-right: 0;
        }

        .count .count_content span {
          display: inline-block;
          vertical-align: middle;
          color: #fff;
        }
        .count .count_content span:first-child {
          width: 45px;
          color: ${COLOR_696C8C};
        }
        .recent_participation .title {
          color: ${COLOR_696C8C};
        }
        .recent_participation .participation span:first-child {
          display: inline-block;
          vertical-align: middle;
          width: 35px;
          height: 13px;
          line-height: 13px;
          margin-right: 5px;
          text-align: center;
          font-size: 10px;
          border-radius: 2px;
          background-image: ${GRADIENT_00F1B4_D53CF5(90)};
        }
        .recent_participation .participation span:last-child {
          color: #fff;
          font-weight: 500;
          display: inline-block;
          vertical-align: middle;
        }
        @media (max-width: 375px) {
          .name_push .name {
            width: 130px;
            font-size: 13px;
            margin-right: 5px;
          }
          .name_push .push span:first-child {
            font-size: 15px;
          }
        }

        @media (max-width: 320px) {
          .UserItems_container {
            margin-bottom: 0;
          }
          .user_img {
            margin-bottom: 5px;
          }
          .name_push .name {
            width: 120px;
            font-size: 12px;
          }
          .name_push .push {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default UserItems;
