import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Common/Avatar";

import {
  GRAY_COLOR,
  WHITE_COLOR,
  COLOR_AE46E7,
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
} from "shared/constants/colors";
import { numberWithCommas, formatRatio } from "shared/functions";
import Link from "next/link";

const DreamerItem = ({ dreamer }) => {
  return (
    <div className="Dreamer_Item">
      <div className="Dreamer_Info_Avatar">
        <Link href="/user/[user_no]" as={`/user/${dreamer.user_no}`}>
          <Avatar width="60px" height="60px" photo={dreamer.user_photo} />
        </Link>
      </div>
      <div className="Dreamer_InfoContainer">
        <div className="Dreamer_Info">
          <h5 className="Dreamer_Info_Nickname">{dreamer.nickname}</h5>
          <div className="Dreamer_Info_Season">
            <span className="Dreamer_Info_Season_Title">Season Rank</span>
            <span className="Dreamer_Info_Season_Rank">{dreamer.ranking}</span>
          </div>
          <div className="Dreamer_Info_Push">
            <span className="Dreamer_Info_Push_Title">Total PUSH</span>
            <span className="Dreamer_Info_Push_Push">
              {numberWithCommas(dreamer.sum_push)}
            </span>
          </div>
        </div>
        <div className="Dreamer_PushInfo">
          <div className="Dreamer_Flex">
            <span className="Dreamer_PushInfo_title">나의 PUSH</span>
            <span className="Dreamer_PushInfo_value Main_Color">
              {numberWithCommas(dreamer.myPushInfo.sum_push)}
            </span>
          </div>
          <div className="Dreamer_Flex">
            <span className="Dreamer_PushInfo_title">점유율</span>
            <span className="Dreamer_PushInfo_value">
              {formatRatio(dreamer.myPushInfo.ratio, "%")}
            </span>
          </div>
          <div className="Dreamer_Flex">
            <span className="Dreamer_PushInfo_title">PD Rank</span>
            <span className="Dreamer_PushInfo_value">
              {dreamer.myPushInfo.ranking}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .Dreamer_Item {
          box-sizing: border-box;
          margin-bottom: 30px;
          width: 100%;
          height: 170px;
          padding: 15px;

          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          background-image: ${GRADIENT_2F3354_040221(180)};
          border-radius: 5px;
        }
        .Dreamer_Item:last-of-type {
          margin: initial;
        }

        .Dreamer_Info_Avatar {
          flex-basis: 60px;
          width: 60px;
          height: 60px;
          margin-right: 15px;
        }

        .Dreamer_InfoContainer {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: space-between;
        }

        .Dreamer_InfoContainer .Dreamer_Info {
          padding: 0 10px 10px 5px;
          border-bottom: 1px solid ${COLOR_696C8C};
        }

        .Dreamer_InfoContainer .Dreamer_Info .Dreamer_Info_Nickname {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: ${WHITE_COLOR};
        }

        .Dreamer_InfoContainer .Dreamer_Info .Dreamer_Info_Season {
          font-size: 14px;
          line-height: 17px;
        }
        .Dreamer_InfoContainer .Dreamer_Info .Dreamer_Info_Push {
          font-size: 14px;
          line-height: 17px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .Dreamer_InfoContainer
          .Dreamer_Info
          .Dreamer_Info_Season
          .Dreamer_Info_Season_Title,
        .Dreamer_InfoContainer
          .Dreamer_Info
          .Dreamer_Info_Push
          .Dreamer_Info_Push_Title {
          color: ${GRAY_COLOR};
        }

        .Dreamer_InfoContainer
          .Dreamer_Info
          .Dreamer_Info_Season
          .Dreamer_Info_Season_Rank {
          margin-left: 10px;
        }

        .Dreamer_InfoContainer
          .Dreamer_Info
          .Dreamer_Info_Season
          .Dreamer_Info_Season_Rank,
        .Dreamer_InfoContainer
          .Dreamer_Info
          .Dreamer_Info_Push
          .Dreamer_Info_Push_Push {
          font-weight: bold;
          color: ${WHITE_COLOR};
        }

        .Dreamer_PushInfo {
          box-sizing: border-box;
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          border-radius: 5px;
        }

        .Dreamer_PushInfo .Dreamer_FlexContainer {
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .Dreamer_PushInfo .Dreamer_Flex {
          flex: 1;
          display: flex;
          align-items: center;
          height: 20px;
        }

        .Dreamer_PushInfo .Dreamer_Flex .Dreamer_PushInfo_title {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          color: ${WHITE_COLOR};
          text-align: left;
          font-size: 13px;
          margin-right: 20px;
          border-radius: 5px;
        }

        .Dreamer_PushInfo .Dreamer_Flex .Dreamer_PushInfo_value {
          font-weight: bold;
          font-size: 13px;
          color: ${WHITE_COLOR};
        }

        .Dreamer_PushInfo .Dreamer_Flex .Dreamer_PushInfo_value.Main_Color {
          width: calc(100% - 88px);
          text-align: right;
          font-weight: bold;
          font-size: 13px;
          color: ${COLOR_AE46E7};
        }
      `}</style>
    </div>
  );
};

DreamerItem.propTypes = {
  user_photo: PropTypes.string,
  nickname: PropTypes.string,
  ranking: PropTypes.number,
  sum_push: PropTypes.number,
  myPushInfo: PropTypes.shape({
    sum_push: PropTypes.number,
    ratio: PropTypes.string,
    ranking: PropTypes.number,
  }),
};

export default DreamerItem;
