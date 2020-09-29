import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { NICE_URL, NICE_ORIGIN_URL } from "shared/constants/variables";
import { OPEN_MODAL } from "store/reducers/modal";
import select_ico from "public/assets/icon/select_arrow(gray).svg";
import Button from "components/Common/Button";
import { userApi } from "shared/api";
import { getError } from "shared/functions";

const PhoneNumber = (props) => {
  const {
    oldNumber,
    phone,
    toggleChange,
    handleSend,
    handleChange,
    handleVerify,
    setConfirmNum,
    isEditPhone,
    isSend,
    isVerified,
    phoneF,
    phoneS,
    confirmNum,
    userName,
    setState,
    userNo,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    return function cleanup() {
      window.removeEventListener("message", onEventByCheckplus);
    };
  }, []);

  const onEventByCheckplus = useCallback(
    async (e, userName, setState) => {
      if (e.origin === NICE_ORIGIN_URL) {
        const {
          name,
          dupinfo: di,
          gender,
          nationalinfo,
          birthdate,
          mobileno,
          code,
        } = e.data;
        if (+code === 200) {
          try {
            console.log(e.data, di);
            const result = await userApi.get("/di", {
              params: {
                di,
              },
            });

            if (result.data.isExist && result.data.user.user_no === userNo) {
              const value = `${mobileno.substr(0, 3)}-${mobileno
                .substr(3)
                .replace(/\B(?=(\d{4})+(?!\d))/, "-")}`;
              const e = {
                target: {
                  name: "phone",
                  value,
                },
              };
              setState(e);
            } else {
              dispatch({
                type: OPEN_MODAL,
                data: {
                  content: "핸드폰의 소유자의 정보가 일치하지 않습니다.",
                  isViewClose: false,
                },
              });
            }
          } catch (error) {
            console.error(error);
            dispatch({
              type: OPEN_MODAL,
              data: {
                content: getError(error),
              },
            });
          }
        } else {
          dispatch({
            type: OPEN_MODAL,
            data: {
              content: (
                <>
                  <h1>errorCode : {code}</h1>
                  <h1>인증에 실패하였습니다.</h1>
                  <h1>관리자에게 문의해주세요.</h1>
                </>
              ),
            },
          });
        }
      }
    },
    [dispatch, userNo]
  );

  // 인증 팝업 생성
  const _handleCertification = () => {
    window.open(
      NICE_URL,
      "popupChk",
      "width=410, height=715, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
    );
    window.addEventListener("message", (e) =>
      onEventByCheckplus(e, userName, setState)
    );
  };
  return (
    <div className="phone_number">
      <div className="phone">
        <span>전화번호</span>
        <input type="text" value={phone} readOnly />
        <Button
          className="rectangle fs_16px v_md"
          handleClick={_handleCertification}
        >
          번호변경
        </Button>
        {/* <button onClick={() => toggleChange()}>
          {isEditPhone ? "취소" : "변경"}
        </button> */}
      </div>
      {/* <div className="new">
        <span>신규번호</span>
        <select value={phoneF} name="phoneF" onChange={handleChange}>
          <option value="010">010</option>
        </select>
        <input
          type="text"
          value={phoneS}
          name="phoneS"
          onChange={handleChange}
        />
        <Button
          className="rectangle fs_16px bg_real_black"
          handleClick={handleSend}
        >
          재전송
        </Button>
      </div>
      <div className="authentication">
        <span>인증번호</span>
        <input
          type="text"
          value={confirmNum}
          onChange={e => setConfirmNum(e.target.value)}
          readOnly={isVerified}
        />
        <Button
          className="rectangle fs_16px"
          onClick={() => handleVerify()}
          disabled={!isSend || confirmNum.length === 0}
        >
          {isVerified ? "인증완료" : "인증"}
        </Button>
      </div> */}
      <style jsx>{`
        button:hover {
          cursor: pointer;
        }
        .phone_number {
          width: 600px;
          border-bottom: 1px solid #444455;
          margin: 0 auto;
          margin-bottom: 30px;
        }

        .phone_number span {
          display: inline-block;
          width: 74px;
          margin-right: 30px;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
        }
        .phone_number button {
          width: 90px;
          height: 60px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          background-color: #f38400;
          border-radius: 15px;
          border: none;
        }
        .phone_number .re {
          width: 90px;
          height: 60px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          background-color: #141418;
          border-radius: 15px;
          border: none;
        }
        .phone_number .phone,
        .phone_number .new {
          margin-bottom: 20px;
        }
        .new {
          display: ${isEditPhone ? "block" : "none"};
        }
        .authentication {
          display: none;
        }
        .phone_number .phone input {
          width: 365px;
          height: 60px;
          display: inline-block;
          padding-left: 30px;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          background-color: #444455;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
          vertical-align: middle;
        }
        .phone_number .new select {
          width: 125px;
          height: 60px;
          border: none;
          border-radius: 15px;
          padding-left: 30px;
          margin-right: 10px;
          font-size: 16px;
          font-weight: 400;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: url(${select_ico}) 88% / 13% no-repeat #fff;
        }
        .phone_number .new input {
          width: 230px;
          height: 60px;
          display: inline-block;
          padding-left: 30px;
          color: #000;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
        }
        .phone_number .authentication input {
          width: 365px;
          height: 60px;
          display: inline-block;
          padding-left: 30px;
          color: #000;
          font-size: 16px;
          font-weight: 400;
          border-radius: 15px;
          border: none;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

PhoneNumber.propTypes = {
  oldNumber: PropTypes.string,
  verifyNum: PropTypes.string,
  toggleChange: PropTypes.func,
  handleSend: PropTypes.func,
  handleChange: PropTypes.func,
  handleVerify: PropTypes.func,
  setConfirmNum: PropTypes.func,
  isEditPhone: PropTypes.bool,
  isSend: PropTypes.bool,
  isVerified: PropTypes.bool,
  phoneF: PropTypes.string,
  phoneS: PropTypes.string,
  confirmNum: PropTypes.string,
  phone: PropTypes.string,
  userName: PropTypes.string,
  setState: PropTypes.func,
};

export default PhoneNumber;
