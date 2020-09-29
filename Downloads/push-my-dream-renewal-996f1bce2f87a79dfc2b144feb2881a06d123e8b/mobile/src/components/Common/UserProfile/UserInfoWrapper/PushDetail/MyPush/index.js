import React, { useContext } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import { numberWithCommas } from "shared/functions";

import { UserProfileContext } from "components/Common/UserProfile";
import NewButton from "components/Common/NewButton";
import { BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const MyPush = ({ category4No, myRank, isPush }) => {
  const { currentUser } = useContext(UserProfileContext);

  const _handlePush = () => {
    if (isPush) {
      Router.push({
        pathname: "/push",
        query: {
          category4No,
          targetUserNo: currentUser.user_no,
          videoNo: null,
          ref: encodeURIComponent(Router.asPath),
        },
      });
    } else {
      alert("푸시 가능한 사용자가 아닙니다.");
    }
  };
  return (
    <div className="my_push">
      <span className="title">My Push</span>
      <div className="push_info">
        {myRank && myRank.sum_push ? numberWithCommas(myRank.sum_push) : "-"}
        {/* <span>{myRank && myRank.ranking ? `#${myRank.ranking}` : "-"}</span>
        <span>
          {myRank && myRank.sum_push ? numberWithCommas(myRank.sum_push) : "-"}
        </span> */}
      </div>
      <NewButton
        className="gradient"
        bgColor={BACKGROUND_BLACK_COLOR}
        fontSize="small"
        height="21px"
        style={{ fontWeight: 400 }}
        onClick={() => _handlePush()}
      >
        PUSH
      </NewButton>
      <style jsx>{`
        .my_push {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .my_push .title {
          font-size: 10px;
          color: #696c8c;
          margin-bottom: 5px;
          display: block;
          text-transform: uppercase;
        }
        .push_info {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .push_info span {
          display: inline-block;
          color: #f38400;
          font-weight: bold;
          font-size: 1em;
        }
        .push_info span:first-child {
          float: left;
        }
        .push_info span:last-child {
          float: right;
        }
      `}</style>
    </div>
  );
};

MyPush.propTypes = {
  category4No: PropTypes.number,
  isPush: PropTypes.bool,
  myRank: PropTypes.shape({
    ranking: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sum_push: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default MyPush;
