import React from "react";

import Button from "components/Common/Button";

import logo from "public/assets/icon/push_logo(white).svg";

const PushCount = () => {
  return (
    <div className="push_count_container">
      <div className="count push">
        <span className="title">내가 참여한 푸쉬</span>
        <span className="counter">3.2M</span>
      </div>
      <div className="count rank">
        <span className="title">점유율/점유순위</span>
        <span className="counter">
          <span>3.2M</span>
          <span className="dash">/</span>
          <span>2</span>
        </span>
      </div>
      <Button
        style={{
          width: "105px",
          height: "45px",
          position: "absolute",
          top: "0",
          right: "0"
        }}
      >
        <img src={logo} alt="logo" width="60px" height="20px" />
      </Button>
      <style jsx>{`
        .push_count_container {
          position: relative;
          height: 45px;
          margin-bottom: 20px;
        }
        .count {
          color: #fff;
        }
        .count .title {
          font-size: 14px;
          display: block;
        }
        .count .counter {
          font-size: 18px;
          display: block;
        }
        .count .counter span {
          display: inline-block;
          vertical-align: middle;
        }
        .count .counter .dash {
          margin: 0 5px;
        }
        .push {
          position: absolute;
          top: 0;
          left: 0;
        }
        .rank {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
};

export default PushCount;
