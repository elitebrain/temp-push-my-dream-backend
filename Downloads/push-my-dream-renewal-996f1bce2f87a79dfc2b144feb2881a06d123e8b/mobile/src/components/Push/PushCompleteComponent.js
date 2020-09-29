import React, { useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";

import UserRankContainer from "containers/User/UserProfile/UserRankContainer";

import Layout from "components/Layout/Layout";
import PushBody from "components/Layout/PushBody";

import { numberWithCommas, imgOnLoad } from "shared/functions";
import {
  GRADIENT_2F3354_040221,
  BACKGROUND_BLACK_COLOR,
  GRADIENT_00F1B4_D53CF5,
  COLOR_AE46E7,
  COLOR_696C8C,
} from "shared/constants/colors";
import TargetProfile from "./TargetProfile";

const PushCompleteComponent = (props) => {
  const {
    season,
    targetUser,
    myProducerInfoByDreamer,
    push,
    addPoint,
    category4No,
  } = props;
  const [profileWidth, setProfileWidth] = useState("auto");
  const [profileHeight, setProfileHeight] = useState("auto");
  console.log("PushCompleteComponent props", props);

  return (
    <>
      <PushBody
        title="푸쉬 완료"
        confirmText="확인"
        handleConfirm={() => Router.back()}
        contentPaddingNone
      >
        <div className="body">
          <TargetProfile
            season={season}
            targetUser={targetUser}
            totalPush={myProducerInfoByDreamer.totalPush}
            myPush={myProducerInfoByDreamer.myPush}
          />
          <div className="push_container">
            <div className="push">
              <div>
                <span>{` + ${numberWithCommas(push)} `}</span>
                <span>PUSH</span>
              </div>
              <div>{`획득 포인트 ${numberWithCommas(addPoint)}`}</div>
            </div>
          </div>
          <UserRankContainer
            userNo={targetUser.user_no}
            category4No={category4No}
            style={{ padding: "0 40px" }}
          />
          <div className="my_push">
            <div className="row">
              <span>내 푸쉬</span>
              <span className="value">
                {numberWithCommas(myProducerInfoByDreamer.myPush)}
              </span>
            </div>
            <div className="row">
              <span>점유율</span>
              <span className="value">{myProducerInfoByDreamer.myRatio}%</span>
            </div>
            <div className="row">
              <span>프로듀서 순위</span>
              <span className="value">{myProducerInfoByDreamer.ranking}위</span>
            </div>
          </div>
          <div className="my_point">
            <div className="row">
              <span>내 보유 포인트</span>
              <span className="value">
                {numberWithCommas(myProducerInfoByDreamer.myPoint)}
              </span>
            </div>
          </div>
        </div>
      </PushBody>
      <style jsx>{`
        .body > div {
          margin-bottom: 15px;
        }
        .profile {
          /* width: calc(100% + 40px);
          margin-left: -20px; */
          background-image: ${GRADIENT_2F3354_040221(90)};
        }
        .profile > picture {
          position: relative;
          display: inline-block;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
          margin-left: 20px;
        }
        .profile > picture > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: ${profileWidth};
          height: ${profileHeight};
        }
        .profile > .profile_text {
          display: inline-block;
          vertical-align: middle;
          padding-left: 13px;
          box-sizing: border-box;
          width: calc(100% - 110px);
          font-size: 12px;
          color: #aaa;
        }
        .profile_text > .name {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }
        .add_push {
          color: #ff5d5d;
        }
        .total_push {
          font-size: 18px;
          color: #fff;
        }
        .body > .push_container {
          margin-bottom: -15px;
        }
        .push_container {
          padding: 20px;
        }
        .push {
          text-align: center;
          padding: 20px 0;
          border-radius: 10px;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;
        }
        .push > div:first-child span:first-child {
          color: ${COLOR_AE46E7};
          font-weight: bold;
          font-size: 30px;
        }
        .push > div:first-child span:last-child {
          font-weight: bold;
          font-size: 16px;
          color: #fff;
        }
        .push > div:last-child {
          font-weight: normal;
          font-size: 14px;
          color: ${COLOR_696C8C};
        }
        .rank {
          padding-bottom: 15px;
        }
        .rank > span {
          position: relative;
          display: inline-block;
          background: linear-gradient(180deg, #2f2f3e 0%, #23222a 100%);
          border-radius: 4px;
          text-align: center;
          width: 31%;
          margin-right: 3%;
          padding: 15px 0;
        }
        .rank > span:last-child {
          margin-right: 0;
        }
        .rank > span > div:first-child {
          font-size: 22px;
          font-weight: 700;
        }
        .fluctuation > img,
        .fluctuation > span {
          display: inline-block;
          vertical-align: middle;
        }
        .fluctuation > img {
          width: 10px;
          height: 10px;
        }
        .fluctuation > span {
          font-size: 10px;
          margin-left: 4px;
        }
        .badge {
          position: absolute;
          width: 47px;
          height: 17px;
          line-height: 17px;
          left: 50%;
          bottom: -8px;
          transform: translateX(-50%);
          text-align: center;
          color: #fff;
          font-size: 10px;
        }
        .badge > img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .my_push {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
        }
        .my_point {
          padding: 0 20px;
          font-size: 16px;
          color: #aaa;
        }
        .row {
          position: relative;
          line-height: 28px;
          font-size: 16px;
          font-weight: normal;
        }
        .row span:first-child {
          color: ${COLOR_696C8C};
        }
        .row > .value {
          position: absolute;
          right: 0;
          color: #fff;
        }
      `}</style>
    </>
  );
};

PushCompleteComponent.propTypes = {
  targetUser: PropTypes.shape({
    user_photo: PropTypes.string,
    nickname: PropTypes.string,
    user_no: PropTypes.number,
  }),
  myProducerInfoByDreamer: PropTypes.shape({
    totalPush: PropTypes.number,
    myPush: PropTypes.number,
    ranking: PropTypes.number,
    myPoint: PropTypes.number,
    myRatio: PropTypes.string,
  }),
  push: PropTypes.number,
  addPoint: PropTypes.number,
  category4No: PropTypes.number,
};

export default PushCompleteComponent;
