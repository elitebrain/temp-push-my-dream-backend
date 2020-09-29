import React from "react";
import UserPhoto from "../../common/UserPhoto";
import UserNickName from "../../common/UserNickName";
import Rank from "../../common/Rank";
import FollowButton from "../../common/FollowButton";
import TotalPushCount from "../../common/TotalPushCount";
import PushCount from "components/Common/PushCount";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="UserPhoto_container">
        <UserPhoto />
      </div>
      <div className="UserNickName_container">
        {/* <UserNickName style={{ fontSize: "18px" }} /> */}
        <UserNickName />
      </div>
      <div className="rank_fans_like_container">
        <Rank positionNone style={{ marginBottom: "10px" }} />
        <div className="follow">
          <span className="count">
            <span>Fans</span>
            <span>999m</span>
          </span>
          {/* <span className="count">
            <span>Likes</span>
            <span>999k</span>
          </span> */}
        </div>
      </div>
      <div className="FollowButton_container">
        {/* <FollowButton positionNone smallSize /> */}
        <FollowButton positionNone />
      </div>
      <div className="TotalPushCount_container">
        <TotalPushCount />
      </div>
      <div className="PushCount_container">
        <PushCount />
      </div>
      <style jsx>{`
        .userInfo {
          margin-bottom: 30px;
        }
        .UserPhoto_container {
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
        }
        .UserNickName_container {
          /* font-size: 12px; */
          font-weight: bold;
          color: #fff;
          display: inline-block;
          vertical-align: middle;
          margin-right: 17px;
        }
        .rank_fans_like_container {
          /* font-size: 12px; */
          color: #878792;
          display: inline-block;
          vertical-align: middle;
          margin-right: 17px;
        }
        .follow {
          color: #878792;
          /* font-size: 12px; */
        }
        .follow .count:first-child {
          margin-right: 17px;
        }
        .follow .count span:first-child {
          margin-right: 5px;
        }
        .FollowButton_container {
          display: inline-block;
          vertical-align: middle;
          margin-right: 17px;
        }
        .TotalPushCount_container {
          width: 240px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 17px;
        }
        .PushCount_container {
          display: inline-block;
          vertical-align: middle;
        }

        @media (max-width: 1366px) {
          .TotalPushCount_container {
            width: 220px;
          }
          .follow .count {
            font-size: 9px;
          }
          .follow .count:first-child {
            margin-right: 10px;
          }
          .UserNickName_container {
            font-size: 8px;
          }
          .UserNickName_container,
          .rank_fans_like_container,
          .FollowButton_container,
          .TotalPushCount_container {
            margin-right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserInfo;
