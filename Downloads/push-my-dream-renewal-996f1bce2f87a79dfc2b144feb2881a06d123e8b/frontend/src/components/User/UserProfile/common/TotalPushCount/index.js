import React, { useContext } from "react";

import { UserContext } from "containers/User/UserContainer";
import { numberWithCommas } from "shared/functions";

const TotalPushCount = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <div className="push_count">
        <span>{numberWithCommas(currentUser.receive_push)}</span>
        <span>PUSH</span>
      </div>
      <div className="line" />
      <style jsx>{`
        .push_count {
          text-align: center;
          line-height: 34px;
        }
        .push_count span:first-child {
          color: #fff;
          font-size: 22px;
          font-weight: bold;
          display: inline-block;
          margin-right: 5px;
        }
        .push_count span:last-child {
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          display: inline-block;
          vertical-align: bottom;
        }
        .line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          margin: 8px 0;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 2560px) {
          .push_count span:first-child {
            font-size: 33px;
          }
          .push_count span:last-child {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default TotalPushCount;
