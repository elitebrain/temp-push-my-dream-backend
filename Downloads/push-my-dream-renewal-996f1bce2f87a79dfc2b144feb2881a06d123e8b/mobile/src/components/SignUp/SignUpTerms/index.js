import React from "react";
import { useRouter } from "next/router";

import Background from "components/Common/Background";
import TermsAgree from "./TermsAgree";

import arrow_left from "public/assets/icon/arrow_left(white).svg";

const SignUpTerms = () => {
  const Router = useRouter();
  return (
    <Background width="100%">
      <Background
        width="100%"
        // height="765px"
        className="m_center"
      >
        <Background
          width="100%"
          height="auto"
          className="m_center p_relative "
          style={{ zIndex: "1" }}
        >
          <div className="sign_up">
            <div>
              <div className="title">회원가입을 위한 약관 동의</div>
            </div>
            <div className="indicator">
              <span className={`item active`}>
                <div className="box">
                  <div className="content_box">
                    <span>STEP</span>
                    <span>1</span>
                  </div>
                </div>
              </span>
              <span className={`item`}>
                <span className="box">
                  <div className="content_box">
                    <span>STEP</span>
                    <span>2</span>
                  </div>
                </span>
              </span>
              <span className={`item`}>
                <span className="box">
                  <div className="content_box">
                    <span>STEP</span>
                    <span>3</span>
                  </div>
                </span>
              </span>
              <span className={`item`}>
                <span className="box">
                  <div className="content_box">
                    <span>STEP</span>
                    <span>4</span>
                  </div>
                </span>
              </span>
            </div>
            <TermsAgree />
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
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;
          padding-top: 50px;
        }
        .sign_up .title {
          font-size: 18px;
          text-align: center;
          color: #fff;
          margin-bottom: 21px;
        }

        .indicator {
          text-align: center;
          margin-bottom: 40px;
        }
        .indicator > .item {
          display: inline-block;
          width: 45px;
          height: 45px;
          text-align: center;
          border-radius: 50%;
          background-color: #333333;
          font-size: 12px;
          /* color: #fff; */
          font-weight: bold;
          margin-right: 5px;
          position: relative;
        }
        .indicator > .item > .box {
          width: 35px;
          height: 35px;
          line-height: 35px;
          border-radius: 50%;
          border: 3px solid #000;
          background-color: #333333;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #696c8c;
        }
        .indicator > .item > .box .content_box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .indicator > .item > .box .content_box span {
          display: block;
          text-align: center;
        }
        .indicator > .item > .box .content_box span:first-child {
          /* font-size: 10px; */
          font-size: 8px;
          line-height: 15px;
          /* line-height: 10px; */
          font-weight: bold;
        }
        .indicator > .item > .box .content_box span:last-child {
          /* font-size: 15px; */
          font-size: 12px;
          /* line-height: 10px; */
          line-height: 13px;
          font-weight: bold;
        }
        .indicator > .item.active {
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          border-radius: 50px;
        }
        .indicator > .item.active .box {
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          color: #fff;
        }
      `}</style>
    </Background>
  );
};

export default SignUpTerms;
