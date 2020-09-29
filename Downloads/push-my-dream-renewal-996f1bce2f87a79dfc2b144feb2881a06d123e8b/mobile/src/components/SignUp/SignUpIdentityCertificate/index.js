import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import IdentityCertification from "./IdentityCertification";
import Background from "components/Common/Background";

import { OPEN_MODAL } from "store/reducers/modal";
import arrow_left from "public/assets/icon/arrow_left(white).svg";
import arrow from "public/assets/icon/arrow_right_ico(purple).svg";

const SignUpIdentityCertificate = ({ identityCertState }) => {
  const Router = useRouter();

  const dispatch = useDispatch();
  const [isCheckplus] = useState(identityCertState ? true : false);

  const onPrevious = useCallback(() => {
    Router.back();
  }, [Router]);

  const onNext = useCallback(async () => {
    try {
      if (!isCheckplus) {
        return dispatch({
          type: OPEN_MODAL,
          data: {
            content: "인증을 진행해주세요.",
            isViewClose: false,
          },
        });
      }

      window.location.href = "/signup/profile";
    } catch (error) {
      console.error(error);
    }
  }, [Router, isCheckplus]);

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
              <div className="title">본인 인증</div>
            </div>
            <div className="indicator">
              <span className={`item `}>
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
              <span className={`item active`}>
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

            <IdentityCertification
              identityCertState={identityCertState}
              isCheckplus={isCheckplus}
            />
            {isCheckplus && (
              <div className="sign_up_footer">
                <button
                  className="back"
                  onClick={() => Router.replace("/signup/login")}
                >
                  <img src={arrow} alt="arrow" onClick={onPrevious} />
                  <span>이전</span>
                </button>

                <button className="next" onClick={onNext}>
                  <span>다음</span>
                  <img src={arrow} alt="arrow" />
                </button>
              </div>
            )}
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
          position: relative;
          height: auto;
          padding: 30px 20px;
          /* padding-top: 30px; */
          overflow: ${isCheckplus ? "auto" : "hidden"};
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
        .sign_up_footer {
          width: 100%;
          text-align: center;
        }
        .sign_up_footer .back {
          margin-right: 100px;
        }
        .sign_up_footer .back img {
          margin-right: 10px;
          transform: rotate(180deg);
        }
        .sign_up_footer .next span {
          margin-right: 10px;
        }
        .sign_up_footer > button {
          border: 0;
          color: #979cca;
          font-weight: bold;
          background: none;
          font-size: 17px;
          cursor: pointer;
        }
        .sign_up_footer > button span {
          display: inline-block;
          vertical-align: middle;
        }
        .sign_up_footer > button img {
          width: 10px;
          height: 17px;
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </Background>
  );
};

SignUpIdentityCertificate.propTypes = {
  identityCertState: PropTypes.object,
};

export default SignUpIdentityCertificate;
