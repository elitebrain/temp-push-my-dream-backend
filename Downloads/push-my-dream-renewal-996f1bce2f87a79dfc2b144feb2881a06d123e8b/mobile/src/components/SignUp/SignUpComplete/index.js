import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import Background from "components/Common/Background";
import ApplicationComplete from "components/Common/ApplicationComplete";

import arrow_left from "public/assets/icon/arrow_left(white).svg";
import Content from "components/Layout/Content";

const SignUpComplete = ({ userState }) => {
  const Router = useRouter();

  return (
    <Background width="100%" height="100%">
      <Background width="100%" height="100%" className="m_center">
        <Background
          width="100%"
          height="100%"
          className="m_center p_relative "
          style={{ zIndex: "1" }}
        >
          <div className="sign_up">
            <ApplicationComplete
              name={userState.name}
              nickname={userState.nickname}
              phone={userState.phone}
              avatar={userState.avatar}
            />
          </div>
        </Background>
      </Background>
      <style jsx>{`
        .container {
          width: 100%;
          height: auto;
          background-color: #1e1e25;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
        }
        .container button {
          width: 85px;
          height: 35px;
          background-color: #f38400;
          border-radius: 50px;
          border: none;
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          margin: 0 auto;
          margin-top: 30px;
          display: block;
        }
        .container .mypage_title {
          height: 50px;
          position: relative;
          background-color: #141418;
        }
        .container .mypage_title .back_ico {
          width: 20px;
          height: 15px;
          text-align: center;
          position: absolute;
          left: 20px;
          transform: translateY(-50%);
          top: 50%;
        }
        .container .mypage_title .title {
          font-size: 20px;
          color: #fff;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
        .sign_up {
          width: 100vw;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          /* height: calc(100vh - 80px); */
        }
        .sign_up .title {
          font-size: 18px;
          text-align: center;
          color: #fff;
          margin-bottom: 21px;
        }
      `}</style>
    </Background>
  );
};

SignUpComplete.propTypes = {
  userState: PropTypes.object,
  identityCertState: PropTypes.object,
};

export default SignUpComplete;
