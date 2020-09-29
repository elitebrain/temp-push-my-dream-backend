import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import { ChargingContext } from "containers/Charging/ChargingContainer";
import Layout from "components/Layout/Layout";
import PlusCircle from "components/Common/CssIcons/PlusCircle";
import RadioCircle from "components/Common/CssIcons/RadioCircle";
import CheckSquare from "components/Common/CssIcons/CheckSquare";
import PushModal from "components/Common/Modal/PushModal";
import Button from "components/Common/Button";
import PushBody from "components/Layout/PushBody";
import NewButton from "components/Common/NewButton";
import AmountButton from "./AmountButton";

import circleClose from "public/assets/icon/circle_close.svg";
import {
  GRADIENT_2F3354_040221,
  COLOR_AE46E7,
  BACKGROUND_BLACK_COLOR,
  COLOR_696C8C,
} from "shared/constants/colors";
import { numberWithCommas, strToInt } from "shared/functions";
import { URL } from "shared/constants/variables";
import Content from "components/Layout/Content";

const chargingMethod = [
  {
    no: 1,
    pgcode: "virtualaccount",
    pgname: "가상계좌",
  },
  {
    no: 2,
    pgcode: "creditcard",
    pgname: "신용카드",
  },
  {
    no: 3,
    pgcode: "banktransfer",
    pgname: "인터넷뱅킹",
  },
  // {
  //   no: 4,
  //   pgcode: "mobile",
  //   pgname: "휴대폰",
  // },
];

const ChargingComponent = () => {
  const [state, setState] = useState({});
  const [isAgree, setIsAgree] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalState, setModalState] = useState({
    amount: "",
    pgname: "가상계좌",
  });
  const { handleCharging } = useContext(ChargingContext);
  const { user_no, user_name, email } = useSelector((state) => state.user);
  useEffect(() => {
    // order_no는 결제 요청 할 때 PG_LOG table에 data 삽입 후 pg_log_no 대입 (backend)
    // product_name은 추가/관리 필요 (db관리 -> 결제요청하기전 선택)
    // live할 때 수정해야 할것들
    // client_id: khanteum
    // email_addr: 칸테움 관리자 이메일
    // return_url: http://127.0.0.1:4000 -> https://m.khanteum.com
    // callback_url: : http://127.0.0.1:4000 -> https://m.khanteum.com
    // cancel_url: : http://127.0.0.1:4000 -> https://m.khanteum.com
    const refUrl = location.origin + sessionStorage.getItem("charging_ref");
    setState({
      pgcode: "virtualaccount",
      user_id: user_no || "",
      user_name: user_name || "",
      service_name: "칸테움",
      client_id: "khanteum",
      // client_id: "pay_test",
      order_no: "12345678901",
      amount: "",
      taxfree_amount: 0,
      tax_amount: 0,
      product_name: "PUSH",
      email_flag: "Y",
      email_addr: email,
      autopay_flag: "N",
      receipt_flag: "Y",
      custom_parameter: location.href,
      // test server
      // return_url:
      //   "https://test.khanteum.com:4000/api/v2/common/charging/return",
      // callback_url:
      //   "https://test.khanteum.com:4000/api/v2/common/charging/callback",
      // cancel_url:
      //   "https://test.khanteum.com:4000/api/v2/common/charging/cancel",
      // live server
      // return_url: "https://m.khanteum.com:4000/api/v2/common/charging/return",
      // callback_url:
      //   "https://m.khanteum.com:4000/api/v2/common/charging/callback",
      // cancel_url: "https://m.khanteum.com:4000/api/v2/common/charging/cancel",
      // local
      return_url: `${URL}:4000/api/v2/common/charging/return`,
      callback_url: `${URL}:4000/api/v2/common/charging/callback`,
      cancel_url: `${URL}:4000/api/v2/common/charging/cancel?charging_ref=${refUrl}`,
    });
  }, [user_no, user_name]);
  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setModalState((prevState) =>
        Object.assign({}, prevState, {
          amount: numberWithCommas(value.toString().replace(/,/g, "")),
        })
      );
    }
    if (name === "pgcode") {
      if (value === "virtualaccount") {
        setModalState((prevState) =>
          Object.assign({}, prevState, { pgname: "가상계좌" })
        );
      }
    }
    setState((prevState) =>
      Object.assign({}, prevState, {
        [name]: numberWithCommas(value.toString().replace(/,/g, "")),
      })
    );
  };
  const _handleAmount = (amount) => {
    setModalState((prevState) =>
      Object.assign({}, prevState, {
        amount: numberWithCommas(
          (prevState.amount.toString().length > 0
            ? strToInt(prevState.amount)
            : 0) + amount
        ),
      })
    );
    setState((prevState) =>
      Object.assign({}, prevState, {
        amount: numberWithCommas(
          (prevState.amount.toString().length > 0
            ? strToInt(prevState.amount)
            : 0) + amount
        ),
      })
    );
  };
  const _initAmount = () => {
    setModalState((prevState) => Object.assign({}, prevState, { amount: "" }));
    setState((prevState) => Object.assign({}, prevState, { amount: "" }));
  };
  const _handleCharging = () => {
    console.log("_handleCharging state", state);
    let alertMsg = "";
    if (
      modalState.amount.length === 0 ||
      !/^[0-9,]*$/.test(modalState.amount)
    ) {
      alertMsg = "충전금액을 정확하게 입력해주세요.";
    } else if (modalState.pgname.length === 0) {
      alertMsg = "충전방법을 선택해주세요.";
    } else if (!isAgree) {
      alertMsg = "결제정보 제공동의 해주세요.";
    } else if (state.user_id.toString().length === 0) {
      alertMsg = "로그인 후 이용해 주세요.";
    }
    if (alertMsg.length === 0) {
      const now = Date.now();
      // 만료시간 30분
      const expires = new Date(now + 1000 * 60 * 30);
      document.cookie = `ref=${location.search.substr(
        location.search.indexOf("ref=") + 4
      )};path=/;expires=${expires.toUTCString()}`;
      handleCharging(
        Object.assign({}, state, {
          amount: strToInt(state.amount),
        })
      );
      _closeModal();
    } else {
      alert(alertMsg);
    }
  };
  const _openModal = () => {
    let alertMsg = "";
    if (
      modalState.amount.length === 0 ||
      !/^[0-9,]*$/.test(modalState.amount)
    ) {
      alertMsg = "충전금액을 정확하게 입력해주세요.";
    } else if (modalState.pgname.length === 0) {
      alertMsg = "충전방법을 선택해주세요.";
    } else if (!isAgree) {
      alertMsg = "결제정보 제공동의 해주세요.";
    }
    if (alertMsg.length > 0) {
      alert(alertMsg);
      return;
    }
    setIsOpenModal(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeModal = () => {
    setIsOpenModal(false);
    document.querySelector("body").style.overflow = "auto";
  };
  console.log("state", state);
  return (
    <>
      <PushBody
        title="PUSH 충전"
        confirmText="충전하기"
        contentPaddingNone
        handleConfirm={() => _handleCharging()}
        // handleBack={() => Router.back()}
        handleBack={() =>
          Router.push(
            location.search.substr(location.search.indexOf("ref=") + 4)
          )
        }
      >
        <div className="wrapper_top">
          <div className="measure">1 원 = 1 PUSH</div>
          <div className="charging_container">
            <div className="amount_label">충전금액</div>
            <div className="wrapper_amount">
              <div className="content_box">
                <div className="input_amount">
                  <input
                    type="text"
                    value={state.amount || ""}
                    name="amount"
                    onChange={_handleChange}
                    placeholder="1,000원 단위로 입력해 주세요."
                  />
                  <span className="reset_amount" onClick={() => _initAmount()}>
                    <img
                      className="circle_ico"
                      src={circleClose}
                      alt="circle_close"
                    />
                  </span>
                </div>
                <div className="amount_btns">
                  <div className="btn_box">
                    <AmountButton onClick={() => _handleAmount(10000)}>
                      1만원
                    </AmountButton>
                  </div>
                  <div className="btn_box">
                    <AmountButton onClick={() => _handleAmount(30000)}>
                      3만원
                    </AmountButton>
                  </div>
                  <div className="btn_box">
                    <AmountButton onClick={() => _handleAmount(50000)}>
                      5만원
                    </AmountButton>
                  </div>
                  <div className="btn_box">
                    <AmountButton onClick={() => _handleAmount(100000)}>
                      10만원
                    </AmountButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper_bottom">
          <div className="label_pgcode">충전방법선택</div>
          <div className="radio_pgcode">
            {chargingMethod &&
              chargingMethod.map((item) => (
                <label className="wrapper_radio" key={item.no}>
                  <input
                    type="radio"
                    name="pgcode"
                    value={item.pgcode}
                    onChange={_handleChange}
                  />
                  <RadioCircle
                    active={state.pgcode === item.pgcode}
                    activeColor={COLOR_AE46E7}
                    borderColor={COLOR_696C8C}
                  />
                  <span>{item.pgname}</span>
                </label>
              ))}
          </div>
          <div className="terms">
            <span onClick={() => setIsAgree((prevState) => !prevState)}>
              <CheckSquare size="11" color={COLOR_696C8C} active={isAgree} />
              <span className="agree_text">결제정보 제공동의</span>
            </span>
            <span>[상세보기]</span>
          </div>
          {/* <div className="wrapper_btn">
              <Button
                handleClick={() => _handleCharging()}
                style={{
                  fontSize: "20px",
                  width: "100vw",
                  height: "65px",
                  borderRadius: 0,
                  fontWeight: 700,
                }}
              >
                충전하기
              </Button>
            </div> */}
        </div>
      </PushBody>

      <style jsx>{`
        .wrapper_top {
          width: 100%;
          padding-bottom: 20px;
          box-sizing: border-box;
        }
        .measure {
          height: 80px;
          line-height: 80px;
          text-align: center;
          font-size: 22px;
          color: #fff;
          margin-bottom: 10px;
        }
        .charging_container {
          background-image: ${GRADIENT_2F3354_040221(180)};
          padding: 15px 20px;
        }
        .amount_label {
          font-size: 16px;
          margin-bottom: 8px;
          color: #fff;
        }
        .wrapper_amount {
          position: relative;
          /* height: 138px; */
          padding: 19px 19px 0;
          box-sizing: border-box;
        }
        .input_amount {
          position: relative;
          margin-bottom: 18px;
        }
        .input_amount > input {
          padding: 6px 12px;
          font-size: 14px;
          width: calc(100% - 25px);
          margin-right: 5px;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid ${COLOR_696C8C};
          background-color: transparent;
          border-radius: 5px;
          color: #fff;
        }
        .input_amount > input::placeholder {
          font-size: 14px;
        }
        .input_amount > .reset_amount {
          display: inline-block;
          vertical-align: middle;

          width: 20px;
          height: 20px;
        }
        /* .circle_ico {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        } */
        .amount_btns {
          /* text-align: center;
          width: calc(100% + 40px);
          margin-left: -20px; */
          height: 40px;
          line-height: 40px;
        }

        .wrapper_bottom {
          padding: 0 20px;
        }
        .amount_btns > .wrapper_bottom {
          position: relative;
          color: #fff;
        }
        .btn_box {
          width: calc(25% - 1px);
          height: 30px;
          line-height: 30px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-block;
        }
        .btn_box:last-child {
          border: none;
        }
        .label_pgcode {
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          padding: 10px 0px 11px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .radio_pgcode {
          font-size: 12px;
          color: #bfbfbf;
          padding: 15px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .radio_pgcode > .wrapper_radio > input[type="radio"] {
          display: none;
        }
        .radio_pgcode > .wrapper_radio > span {
          display: inline-block;
          vertical-align: middle;
          margin-right: 12px;
          margin-left: 6px;
          color: ${COLOR_696C8C};
        }
        .terms {
          font-size: 12px;
          color: #e3e3e3;
          padding-top: 15px;
        }
        .terms > span {
          display: inline-block;
          vertical-align: middle;
        }
        .terms .agree_text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 8px;
          margin-right: 3px;
          color: ${COLOR_696C8C};
        }
        .terms > span:last-child {
          text-decoration: underline;
          color: ${COLOR_696C8C};
        }
        .wrapper_btn {
          position: fixed;
          left: 0;
          bottom: 0;
        }
        @media (max-width: 375px) {
          .input_amount > input::placeholder {
            font-size: 12px;
          }
          .wrapper_amount {
            padding: 0;
          }
        }
        @media (max-width: 320px) {
          .radio_pgcode {
            padding: 9px 0;
          }
        }
      `}</style>
    </>
  );
};

export default ChargingComponent;
