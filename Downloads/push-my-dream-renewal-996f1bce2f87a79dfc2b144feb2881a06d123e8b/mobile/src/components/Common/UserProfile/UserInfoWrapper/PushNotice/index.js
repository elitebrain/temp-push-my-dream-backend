import React, { useContext } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import NewButton from "components/Common/NewButton";
import { UserProfileContext } from "components/Common/UserProfile";

import { COLOR_696C8C, BACKGROUND_BLACK_COLOR } from "shared/constants/colors";

const PushNotice = ({ category4No, isPush }) => {
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
    <div className="push_notice_container">
      <div className="comment">
        <span className="no_exist_fund">
          아직 받은<p>PUSH</p>가 없습니다.
        </span>
        <span className="no_exist_fund">최초의 지지자가 되어주세요!</span>

        <NewButton
          className="gradient"
          bgColor={BACKGROUND_BLACK_COLOR}
          fontSize="small"
          height="21px"
          style={{ fontWeight: 400, marginTop: "10px" }}
          onClick={() => _handlePush()}
        >
          PUSH
        </NewButton>
      </div>
      <style jsx>{`
        .push_notice_container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
        }
        .infinite_ico {
          width: 41px;
          height: 21px;
          margin: 0 auto;
          margin-bottom: 10px;
        }
        .comment .no_fund,
        .comment .no_exist_fund {
          display: block;
          color: ${COLOR_696C8C};
          font-size: 12px;
        }
        .comment .no_exist_fund p,
        .comment .no_fund p {
          display: inline;
        }
      `}</style>
    </div>
  );
};

PushNotice.propTypes = {
  isPush: PropTypes.bool.isRequired,
  category4No: PropTypes.number,
};

export default PushNotice;
