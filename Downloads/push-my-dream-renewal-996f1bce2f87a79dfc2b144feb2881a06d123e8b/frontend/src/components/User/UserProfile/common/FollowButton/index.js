import React from "react";
import { useSelector } from "react-redux";

import follow_btn_bg from "public/assets/image/button_glass.png";
import preson_white from "public/assets/image/person_none(white).png";
import followPerson from "public/assets/icon/follow_person.svg";
import followingPerson from "public/assets/icon/following_person.svg";

const FollowButton = (props) => {
  const {
    userNo,
    handleFollow,
    followLoading,
    positionNone,
    smallSize,
  } = props;
  const { followingList } = useSelector((state) => state.user);
  const _handleFollow = () => {
    if (followLoading) {
      return;
    }
    if (followingList.indexOf(userNo) === -1) {
      handleFollow("follow");
    } else {
      handleFollow("unfollow");
    }
  };
  return (
    <div
      className={`follow_btn${positionNone ? " positionNone" : ""}${
        smallSize ? " smallSize" : ""
      }`}
      onClick={() => _handleFollow()}
    >
      <span>
        {followingList.indexOf(userNo) === -1 ? (
          <img
            src={followPerson}
            alt="follow_person_ico"
            width="100%"
            height="100%"
          />
        ) : (
          <img
            src={followingPerson}
            alt="following_person_ico"
            width="100%"
            height="100%"
          />
        )}
      </span>
      <span>팔로우</span>
      {/* <span>
        <img src={preson_white} alt="follow_ico" width="100%" height="100%" /> 보라색 으로 변경할 것.
      </span>
      <span>팔로잉</span> */}

      <style jsx>{`
        .follow_btn.smallSize {
          width: 40px;
          height: 40px;
        }
        .follow_btn.smallSize span:first-child {
          width: 15px;
          height: 15px;
        }
        .follow_btn.smallSize span:last-child {
          font-size: 10px;
        }
        .follow_btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-image: url(${follow_btn_bg});
          background-size: cover;
          background-repeat: no-repeat;
          box-sizing: border-box;
          position: absolute;
          right: -42px;
          bottom: 0;
        }
        .follow_btn:hover {
          cursor: pointer;
        }
        .follow_btn.positionNone {
          position: inherit;
        }
        .follow_btn span {
          display: block;
        }
        .follow_btn span:first-child {
          width: 18px;
          height: 18px;
          margin: 0 auto;
          margin-top: 6px;
        }
        .follow_btn span:last-child {
          font-size: 7px;
          font-weight: 500;
          text-align: center;
          color: #fff;
        }
        @media (max-width: 1366px) {
          .follow_btn {
            right: -55px;
          }
        }
        @media (min-width: 2560px) {
          .follow_btn {
            width: 65px;
            height: 65px;
            padding-top: 8px;
          }
          .follow_btn span:first-child {
            width: 20px;
            height: 20px;
            margin: 0 auto;
            margin-bottom: 5px;
          }
          .follow_btn span:last-child {
            font-size: 17px;
            font-weight: 500;
            text-align: center;
            color: #fff;
          }
        }
      `}</style>
    </div>
  );
};

export default FollowButton;
