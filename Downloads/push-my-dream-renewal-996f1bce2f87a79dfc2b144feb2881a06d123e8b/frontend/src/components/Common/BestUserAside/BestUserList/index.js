import React from "react";
import PropTypes from "prop-types";

import rank_box from "public/assets/image/rank_box.png";
import arrow from "public/assets/icon/arrow_light_bottom_ico(gray).svg";

const BestUserList = ({ title, list, renderItem, isView = true, style }) => {
  console.log("isView", isView);
  if (!isView) {
    return null;
  }
  return (
    <div className="best_user_list">
      <div className="best_user_list_title">{title}</div>
      <div className="best_user_list_container" style={style}>
        <div className="content_box">
          <div className="deco" />
          <div className="user_list">{list.map(renderItem)}</div>
          <div className="more">
            <span>
              <img src={arrow} alt="arrow" width="100%" height="100%" />
            </span>
            <span>more</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .best_user_list {
          margin-bottom: 30px;
        }
        .best_user_list:last-child {
          margin-bottom: 0;
        }
        .best_user_list_title {
          font-size: 12px;
          font-weight: bold;
          color: #ffffff;
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .best_user_list_container {
          width: 137px;
          height: 235px;
          border-radius: 10px 0px 0px 10px;
          padding: 10px;
          position: relative;
          z-index: 1;
        }
        .best_user_list_container::after {
          content: "";
          background-image: url(${rank_box});
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0.3;
          width: 100%;
          height: 100%;
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
        }
        .content_box {
          position: relative;
        }
        .deco {
          position: absolute;
          width: 15px;
          height: 25px;
          left: -12px;
          top: -17px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(196, 196, 196, 0) 100%
          );
          transform: rotate(30deg);
        }
        .more {
          text-align: center;
        }
        .more span:first-child {
          width: 10px;
          height: 8px;
          line-height: 8px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
        .more span:last-child {
          font-size: 10px;
          font-weight: normal;
          color: #999999;
          display: inline-block;
          vertical-align: middle;
        }
        @media (max-width: 1366px) {
          .best_user_list {
            margin-bottom: 15px;
          }
        }
        @media (min-width: 2560px) {
          .best_user_list_title {
            font-size: 20px;
          }
          .more span:last-child {
            font-size: 15px;
          }
          .best_user_list_container {
            width: 180px;
            height: 365px;
          }
        }
      `}</style>
    </div>
  );
};

BestUserList.propTypes = {
  isView: PropTypes.bool,
  style: PropTypes.object,
};

export default BestUserList;
