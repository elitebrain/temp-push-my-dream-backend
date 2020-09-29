import React from "react";
import PropTypes from "prop-types";

import gate_producer_img from "public/assets/image/gate_producer_img.png";

const UserItem = ({ isViewPush }) => {
  return (
    <div className="user_item">
      <div className="producer_img" />
      <span>채린</span>
      {isViewPush && (
        <span className="push_counter">
          <span>8,153</span>
          <span>PUSH</span>
        </span>
      )}
      <style jsx>{`
        .user_item {
          display: inline-block;
          margin-right: 20px;
        }
        .producer_img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          /* border: 1px solid #fff; */
          background-image: url(${gate_producer_img});
          background-position: center center;
          background-size: cover;
          margin-bottom: 8px;
        }
        .user_item span {
          display: block;
          text-align: center;
          font-size: 15px;
          color: #fff;
        }
        .user_item .push_counter {
          display: block;
          text-align: center;
          color: #f38400;
        }
        .user_item .push_counter span:first-child {
          font-size: 11px;
          display: inline-block;
          font-weight: bold;
          color: #f38400;
          margin-right: 5px;
        }
        .user_item .push_counter span:last-child {
          font-size: 9px;
          display: inline-block;
          font-weight: 600;
          color: #f38400;
        }
      `}</style>
    </div>
  );
};

UserItem.propTypes = {
  isViewPush: PropTypes.bool
};

export default UserItem;
