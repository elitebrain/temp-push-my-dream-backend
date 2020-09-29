import React from "react";
import PropTypes from "prop-types";
import { setNumberFormat } from "shared/functions";
import { COLOR_AE46E7 } from "shared/constants/colors";

const UserItem = ({ user, isViewPush, onClick }) => {
  return (
    <div
      className="user_item"
      onClick={onClick && onClick.bind(this, user.user_no)}
    >
      <div className="user_img" />
      <span className="nickname">{user.nickname}</span>
      {isViewPush && (
        <span className="push_counter">
          <span>{setNumberFormat(user.sum_push).toUpperCase()}</span>
          <span>PUSH</span>
        </span>
      )}
      <style jsx>{`
        .user_item {
          width: 80px;
          display: inline-block;
          margin-right: 20px;
          cursor: pointer;
        }

        .user_item:first-of-type {
          margin-left: 20px;
        }

        .user_item:last-of-type {
          margin-right: 20px;
        }

        .user_img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          /* border: 1px solid #fff; */
          background-color: #444;
          background-image: url(${user.user_photo});
          background-position: center center;
          background-size: cover;
          margin-bottom: 8px;
        }
        .user_item .nickname {
          width: 80px;
          display: block;
          text-align: center;
          font-size: 13px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user_item .push_counter {
          font-weight: bold;
          width: 80px;
          display: block;
          text-align: center;
          color: ${COLOR_AE46E7};
        }
        .user_item .push_counter span:first-child {
          font-weight: bold;
          font-size: 11px;
          display: inline-block;
          font-weight: bold;
          color: ${COLOR_AE46E7};
          margin-right: 5px;
        }
        .user_item .push_counter span:last-child {
          font-weight: bold;
          font-size: 9px;
          display: inline-block;
          color: ${COLOR_AE46E7};
        }
      `}</style>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string,
    user_photo: PropTypes.string,
    sum_push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  isViewPush: PropTypes.bool,
  onClick: PropTypes.func,
  isFunding: PropTypes.bool,
};

export default UserItem;
