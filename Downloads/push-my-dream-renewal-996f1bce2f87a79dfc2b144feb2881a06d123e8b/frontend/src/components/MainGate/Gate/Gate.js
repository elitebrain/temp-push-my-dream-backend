import React from "react";
import Link from "next/link";

import GateImageItem from "./GateImageItem/GateImageItem";

import arrow_ico from "public/assets/image/circle_arrow_right_none_tail(white).png";
import UserItem from "components/Common/UserItem";

const Gate = ({ subTitle, title, href, isEmergenza }) => {
  return (
    <div className="gate_container">
      <div className="sub_title">{subTitle}</div>
      <div className="title">
        <span>{title}</span>
        <span className="join_btn">
          <Link href={href}>
            <img src={arrow_ico} alt="join_btn" width="100%" height="100%" />
          </Link>
        </span>
      </div>
      {isEmergenza ? (
        <div className="img_list">
          <GateImageItem />
          <GateImageItem />
          <GateImageItem />
        </div>
      ) : (
        <div className="img_list">
          <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush />
          <UserItem isViewPush />
        </div>
      )}
      <style jsx>{`
        .gate_container {
          margin-right: -20px;
        }
        .sub_title {
          font-size: 12px;
          color: #f38400;
          margin-bottom: 8px;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 15px;
        }
        .title span {
          display: inline-block;
          vertical-align: middle;
        }
        .join_btn {
          width: 20px;
          height: 20px;
          margin-left: 7px;
        }
        .img_list {
          overflow: auto;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default Gate;
