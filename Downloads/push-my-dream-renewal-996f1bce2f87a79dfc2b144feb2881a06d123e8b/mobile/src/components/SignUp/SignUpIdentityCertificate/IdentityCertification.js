import React, { useCallback } from "react";
import PropTypes from "prop-types";

import Input from "components/Common/Input";

import check_ico from "public/assets/image/icon_check_circle_line.png";
import select_ico from "public/assets/icon/select_arrow(gray).svg";
import arrow from "public/assets/icon/arrow_right_ico(purple).svg";

import { NICE_URL } from "shared/constants/variables";
import { BACKGROUND_BLACK_COLOR, COLOR_696C8C } from "shared/constants/colors";
import { useRouter } from "next/router";

const IdentityCertification = ({ isCheckplus, identityCertState }) => {
  const Router = useRouter();
  const onPrevious = useCallback(() => {
    Router.back();
  }, [Router]);

  return (
    <div className="identity_certification">
      {!isCheckplus ? (
        <>
          <div className="content">
            <div className="buttonContainer">
              <div className="buttonContainer_content">
                <a
                  className="identityCertificationButton"
                  href={`${NICE_URL}/signup`}
                  // handleClick={_handleCertification}
                >
                  휴대폰 인증
                </a>
              </div>
            </div>
          </div>
          <div className="sign_up_footer">
            <button className="back" onClick={onPrevious}>
              <img src={arrow} alt="arrow" />
              <span>이전</span>
            </button>
            <button className="next"></button>
          </div>
        </>
      ) : (
        <div className="infoContainer">
          <div className="content_box">
            <div className="title">이름</div>
            <div className="name">
              <Input
                width="100%"
                height="100%"
                type="text"
                id="name"
                value={identityCertState.name}
                readOnly
                style={{
                  paddingLeft: "10px",
                  backgroundColor: BACKGROUND_BLACK_COLOR,
                  border: "1px solid #3B3D55",
                }}
              />
              {/* // <input type="text" id="name" value={identityCertState.name} /> */}
            </div>
          </div>
          <div className="content_box ">
            <div className="title">성별</div>
            <div className="gender_box">
              <div
                className={`gender boy${
                  identityCertState.gender === "1" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <div className="content_container">
                    <img
                      src={check_ico}
                      alt="check_ico"
                      width="20px"
                      height="20px"
                    />
                    <span className="gender_title ">남자</span>
                  </div>
                </div>
              </div>
              <div
                className={`gender girl${
                  identityCertState.gender === "0" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <div className="content_container">
                    <img
                      src={check_ico}
                      alt="check_ico"
                      width="20px"
                      height="20px"
                    />
                    <span className="gender_title">여자</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_box">
            <div className="title">국적</div>
            <div className="gender_box">
              <div
                className={`gender boy${
                  identityCertState.country === "0" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <div className="content_container">
                    <img
                      src={check_ico}
                      alt="check_ico"
                      width="20px"
                      height="20px"
                    />
                    <span className="gender_title ">내국인</span>
                  </div>
                </div>
              </div>
              <div
                className={`gender girl${
                  identityCertState.country === "1" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <div className="content_container">
                    <img
                      src={check_ico}
                      alt="check_ico"
                      width="20px"
                      height="20px"
                    />
                    <span className="gender_title">외국인</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_box">
            <div className="title">생년월일</div>
            <div className="name">
              <Input
                width="100%"
                height="100%"
                type="text"
                id="name"
                maxLength="8"
                value={identityCertState.birthdate}
                readOnly
                style={{
                  paddingLeft: "10px",
                  backgroundColor: BACKGROUND_BLACK_COLOR,
                  border: "1px solid #3B3D55",
                }}
              />
              {/* <input
                type="text"
                id="identityNumFirst"
                maxLength="6"
                readOnly
                value={identityCertState.identityNumFirst}
              /> */}
              {/* <input
                type="password"
                id="identityNumSecond"
                maxLength="7"
                readOnly
                value={identityCertState.identityNumSecond}     />*/}
            </div>
          </div>
          <div className="content_box">
            <div className="title">전화 번호</div>
            <div className="name">
              <Input
                width="130px"
                height="100%"
                type="text"
                id="name"
                maxLength="3"
                value={identityCertState.phoneFirst}
                readOnly
                style={{
                  marginRight: "20px",
                  width: "calc(40% - 10px)",
                  paddingLeft: "10px",
                  backgroundColor: BACKGROUND_BLACK_COLOR,
                  border: "1px solid #3B3D55",
                }}
              />
              <Input
                height="100%"
                type="text"
                id="name"
                maxLength="8"
                value={identityCertState.phoneSecond}
                readOnly
                style={{
                  width: "calc(60% - 10px)",
                  paddingLeft: "10px",
                  backgroundColor: BACKGROUND_BLACK_COLOR,
                  border: "1px solid #3B3D55",
                }}
              />
              {/* <select id="phoneFirst" value={identityCertState.phoneFirst}>
              <option>010</option>
              <option>011</option>
            </select> */}
              {/* <div className="phone_number">
                <input
                  type="text"
                  id="phoneSecond"
                  maxLength="8"
                  readOnly
                  value={identityCertState.phoneSecond}
                /> 
              </div>*/}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .content_container {
          border-radius: 5px;
          background-color: ${BACKGROUND_BLACK_COLOR};
          width: calc(100% - 2px);
          height: 38px;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .content {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
        }

        .identity_certification {
          margin: 0 auto;
          max-width: 1200px;
        }
        .identity_certification .buttonContainer {
          padding-bottom: 30px;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .buttonContainer_content {
          width: 200px;
          height: 100px;
          border-radius: 5px;
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          position: relative;
        }
        .identity_certification .buttonContainer .identityCertificationButton {
          width: 196px;
          height: 94px;
          background-color: ${BACKGROUND_BLACK_COLOR};
          line-height: 100px;
          border-radius: 5px;
          font-size: 20px;
          text-decoration: none;
          color: #fff;
          display: block;
          margin: 0 auto;
          text-align: center;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .identity_certification .content_box {
          margin-bottom: 20px;
        }

         {
          /* .identity_certification .content_box:last-of-type {
          margin-bottom: initial;
        } */
        }

        .identity_certification .content_box .title {
          width: 110px;
          color: #fff;
          font-size: 14px;
          margin-left: 5px;
          margin-bottom: 10px;
        }
        .identity_certification input[type="text"],
        .identity_certification input[type="password"] {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          border-radius: 15px;
          border: none;
          padding-left: 30px;
          box-sizing: border-box;
        }
        .identity_certification .content_box .name {
          width: 100%;
          height: 40px;
          font-size: 14px;
        }
        .identity_certification .content_box .gender {
          width: 60%;
          height: 38px;
          line-height: 38px;
          border: 1px solid #434354;
          border-radius: 5px;
          color: ${COLOR_696C8C};
          text-align: center;
          background-color: #1e1e25;
        }
        .identity_certification .content_box .gender_box {
          position: relative;
          width: 100%;
          height: 40px;
          vertical-align: middle;
        }
        /* .identity_certification .content_box .gender_box:hover {
          cursor: pointer;
        } */
        .identity_certification .content_box .gender_box .boy {
          position: absolute;
          left: 0;
        }
        .identity_certification .content_box .gender_box .girl {
          position: absolute;
          right: 0px;
        }
        .identity_certification .content_box .gender_box .active {
          background: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
          height: 40px;
          border: none;
          color: #fff;
          z-index: 1;
        }
        .identity_certification .content_box .gender_box .active img {
          opacity: 1;
        }
        .identity_certification .content_box .gender_box .active .p_relative {
          height: 40px;
        }
        .identity_certification .content_box .gender img {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
        }
        .identity_certification .content_box .gender .gender_title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 17px;
          line-height: 17px;
        }
        .identity_certification .content_box .gender .p_relative {
          position: relative;
          /* width: 235px; */
          height: 38px;
          line-height: 38px;
        }
        .identity_certification .identityNum_box {
          width: 100%;
          height: 100%;
        }
        /* .identity_certification .identityNum_box input:first-child {
          margin-right: 12px;
        } */
        .identity_certification select {
          width: 130px;
          height: 40px;
          font-size: 14px;
          padding-left: 30px;
          box-sizing: border-box;
          border-radius: 15px;
          margin-right: 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 88% / 13% no-repeat #fff;
        }
        .sign_up_footer {
          width: 100%;
          text-align: center;
          padding-bottom: 60px;
        }
        .sign_up_footer .back {
          margin-right: 100px;
        }
        .sign_up_footer .back img {
          margin-right: 10px;
          transform: rotate(180deg);
        }

        .sign_up_footer .next {
          width: 54px;
        }
        .sign_up_footer .next span {
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
        /* .identity_certification select::-ms-expand {
          display: none; 
        }        */
        .identity_certification .phone_number {
          width: 230px;
          height: 40px;
          margin-right: 10px;
          display: inline-block;
        }
        .identity_certification .confirm {
          width: 90px;
          height: 40px;
          border-radius: 15px;
          font-size: 14px;
          color: #fff;
          background-color: #f38400;
          border: none;
        }
      `}</style>
    </div>
  );
};

IdentityCertification.propTypes = {
  isCheckplus: PropTypes.bool,
  identityCertState: PropTypes.object,
};

export default IdentityCertification;
