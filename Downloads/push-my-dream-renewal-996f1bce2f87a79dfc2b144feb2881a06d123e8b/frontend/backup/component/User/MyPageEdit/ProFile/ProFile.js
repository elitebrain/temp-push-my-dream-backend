import React from "react";
import PropTypes from "prop-types";

import { dashToDot } from "shared/functions";

const ProFile = props => {
  const { myInfo } = props;
  return (
    <div className="profile">
      <ul>
        <li>
          <span className="title">닉네임</span>
          <span className="content">{myInfo.nickname}</span>
        </li>
        <li>
          <span className="title">성별</span>
          <span className="content">{myInfo.gender ? "남자" : "여자"}</span>
        </li>
        <li>
          <span className="title">이름</span>
          <span className="content">{myInfo.user_name}</span>
        </li>
        <li>
          <span className="title">가입일</span>
          <span className="content">
            {myInfo.created_at
              ? dashToDot(myInfo.created_at.substr(0, 10))
              : ""}
          </span>
        </li>
        <li>
          <span className="title">로그인계정</span>
          <span className="content">{myInfo.email}</span>
        </li>
      </ul>
      <style jsx>{`
          .profile {
            width: 600px;
            height: 165px;
            background-color: #141418;
            border-radius: 15px;
            padding: 30px 0 30px 30px;
            box-sizing: border-box;
            margin: 0 auto;
            margin-bottom: 20px;
          }
          .profile ul li {
            width: 275px;
            display: inline-block;
            margin-bottom: 20px;
          }
          .profile ul li:nth-child(1),
          .profile ul li:nth-child(3) {
            margin-right: 20px;
          }
          .profile ul li:last-child {
            width: 100%;
            margin-bottom: 0;
          }
          .profile ul li:before {
            content: "";
            background-color: #f38400;
            font-weight: bold;
            display: inline-block;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            position: relative;
            top: 50%;
            left: 0;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            margin-right: 10px;
          }
          .profile ul li .title {
            width: 75px;
            display: inline-block;
            color: #fff;
            font-size: 16px;
            font-weight: 300;
            margin-right: 28px;
          }
          .profile ul li .content {
            display: inline-block;
            color: #fff;
            font-size: 16px;
            font-weight: 400;
          }
        `}</style>
    </div>
  );
};

ProFile.propTypes = {
  myInfo: PropTypes.object
};

export default ProFile;
