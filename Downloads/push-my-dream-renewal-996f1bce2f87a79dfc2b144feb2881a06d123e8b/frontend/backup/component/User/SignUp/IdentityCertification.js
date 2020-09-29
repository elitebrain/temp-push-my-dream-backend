import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Input from "components/Common/Input";

import check_ico from "public/assets/icon/check.svg";
import select_ico from "public/assets/icon/select_arrow(gray).svg";

import { NICE_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";

const IdentityCertification = ({ isCheckplus, identityCertState }) => {
  const Router = useRouter();
  const dispatch = useDispatch();

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

  // 인증 팝업 생성
  const _handleCertification = () => {
    window.open(
      NICE_URL,
      "popupChk",
      "width=410, height=715, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    window.addEventListener("message", onEventByCheckplus);
  };
  return (
    <div className="identity_certification">
      <div className="buttonContainer">
        <Button
          className="radius"
          width="400px"
          height="100px"
          onClick={_handleCertification}
        >
          휴대폰 인증하기
        </Button>
      </div>
      {isCheckplus && (
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
                  <img
                    src={check_ico}
                    alt="check_ico"
                    width="20px"
                    height="13px"
                  />
                  <span className="gender_title ">남자</span>
                </div>
              </div>
              <div
                className={`gender girl${
                  identityCertState.gender === "0" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <img
                    src={check_ico}
                    alt="check_ico"
                    width="20px"
                    height="13px"
                  />
                  <span className="gender_title">여자</span>
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
                  <img
                    src={check_ico}
                    alt="check_ico"
                    width="20px"
                    height="13px"
                  />
                  <span className="gender_title ">내국인</span>
                </div>
              </div>
              <div
                className={`gender girl${
                  identityCertState.country === "1" ? " active" : ""
                } `}
              >
                <div className="p_relative">
                  <img
                    src={check_ico}
                    alt="check_ico"
                    width="20px"
                    height="13px"
                  />
                  <span className="gender_title">외국인</span>
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
                style={{ marginRight: "77px" }}
                // style={{
                //   marginRight: "20px",
                //   width: "calc(40% - 10px)",
                //   paddingLeft: "10px",
                // }}
              />
              <Input
                height="100%"
                type="text"
                id="name"
                maxLength="8"
                value={identityCertState.phoneSecond}
                readOnly
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
          <div className="sign_up_footer">
            <button onClick={() => Router.replace("/signup/login")}>
              이전
            </button>

            <button onClick={onNext}>다음</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .identity_certification {
          width: 585px;
          height: 0;
          visibility: hidden;
          /* width: 100%;*/
          margin: 0 auto;
        }
        .identity_certification .buttonContainer {
          padding: 0 0px 30px 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .identity_certification .buttonContainer .identityCertificationButton {
          width: 200px;
          height: 100px;
          line-height: 100px;
          border-radius: 10px;
          font-size: 20px;
          text-decoration: none;
          background-color: #f38400;
          color: #fff;
          display: block;
          margin: 0 auto;
          text-align: center;
          cursor: pointer;
        }

        .identity_certification .infoContainer {
          border-top: 2px solid #292930;
          padding-top: 30px;
        }
        .identity_certification .content_box {
          margin-bottom: 20px;
        }
        .identity_certification .content_box div {
          display: inline-block;
        }
        .identity_certification .content_box .title {
          width: 110px;
          color: #fff;
          font-size: 16px;
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
          width: 472px;
          height: 60px;
          font-size: 16px;
        }

        .identity_certification .content_box .gender {
          width: 250px;
          height: 60px;
          line-height: 60px;
          border: 2px solid #434354;
          border-radius: 15px;
          color: #fff;
          text-align: center;
          background-color: #1e1e25;
        }
        .identity_certification .content_box .gender_box {
          position: relative;
          width: 470px;
          height: 60px;
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
          right: -4px;
        }
        .identity_certification .content_box .gender_box .active {
          border: 2px solid #e37e08;
          color: #e37e08;
          z-index: 1;
        }
        .identity_certification .content_box .gender_box .active img {
          opacity: 1;
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
          width: 235px;
          height: 60px;
          line-height: 60px;
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
          height: 60px;
          font-size: 16px;
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
          margin-top: 48px;
          height: 55px;
          text-align: center;
        }
        .sign_up_footer > button {
          width: 87px;
          height: 45px;
          line-height: 45px;
          border-radius: 50px;
          background-color: #444455;
          border: 0;
          color: #eee;
          font-size: 16px;
          margin-right: 20px;
          cursor: pointer;
        }
        .sign_up_footer > button:last-child {
          background-color: #f38400;
          margin-right: 0;
        }

        /* .identity_certification select::-ms-expand {
          display: none; 
        }        */
        .identity_certification .phone_number {
          width: 230px;
          height: 60px;
          margin-right: 10px;
          display: inline-block;
        }
        .identity_certification .confirm {
          width: 90px;
          height: 60px;
          border-radius: 15px;
          font-size: 16px;
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
