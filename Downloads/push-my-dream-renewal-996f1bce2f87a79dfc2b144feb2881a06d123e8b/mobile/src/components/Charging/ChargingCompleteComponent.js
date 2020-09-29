import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector } from "react-redux";

import Layout from "components/Layout/Layout";
import PushBody from "components/Layout/PushBody";

import {
  dateToKorYYMDHMS,
  dateToKorYYMD,
  numberWithCommas,
} from "shared/functions";
import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  GRADIENT_00F1B4_D53CF5,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";

const ChargingCompleteComponent = (props) => {
  const { pgLog } = props;
  const { pgcode } = pgLog;
  const { have_push } = useSelector((state) => state.user);
  console.log("ChargingCompleteComponent pgcode", pgcode);
  const _handleConfirm = () => {
    const refUrl = sessionStorage.getItem("charging_ref");
    Router.push(refUrl || "/");
  };
  return (
    <>
      {pgcode === "virtualaccount" ? (
        <PushBody
          title="가상 계좌 발급 정보"
          confirmText="확인"
          handleConfirm={() => _handleConfirm()}
          contentPaddingNone
        >
          <div className="top_middle_box">
            <div className="wrapper_top">
              <div className="category">
                <span>발급 일시</span>
                <span>{dateToKorYYMDHMS(new Date(pgLog.created_at))}</span>
              </div>
              <div className="category">
                <span>방법</span>
                <span>가상계좌</span>
              </div>
            </div>
            <div className="wrapper_middle">
              <div className="category">
                <span>은행</span>
                <span>{pgLog.bank_name}</span>
              </div>
              <div className="category">
                <span>계좌</span>
                <span>{pgLog.pay_info}</span>
              </div>
              <div className="category">
                <span>예금주</span>
                <span>(주)칸컴스</span>
              </div>
              <div className="category">
                <span>금액</span>
                <span>{numberWithCommas(pgLog.amount)}원</span>
              </div>
              <div className="category">
                <span>기한</span>
                <span>{dateToKorYYMD(new Date(pgLog.expire_date))}</span>
              </div>
            </div>
          </div>
          {/* <div className="wrapper_bottom">
            <div>충전 예정 푸쉬</div>
            <div className="push_point">
              <span>{numberWithCommas(pgLog.push_point)}</span>
              <span>PUSH</span>
            </div>
          </div> */}
        </PushBody>
      ) : pgcode === "creditcard" || pgcode === "banktransfer" ? (
        <PushBody
          title="결제 완료"
          confirmText="확인"
          contentPaddingNone
          handleConfirm={() => _handleConfirm()}
        >
          <div className="top_middle_box">
            <div className="wrapper_top">
              <div className="category">
                <span>일시</span>
                <span>{dateToKorYYMDHMS(new Date(pgLog.charging_time))}</span>
              </div>
              <div className="category">
                <span>방법</span>
                <span>신용카드</span>
              </div>
              <div className="category">
                <span>결제 금액</span>
                <span>{numberWithCommas(pgLog.amount)} 원</span>
              </div>
              <div className="category">
                <span>충전 PUSH</span>
                <span>{numberWithCommas(pgLog.push_point)} PUSH</span>
              </div>
            </div>
          </div>
          <div className="wrapper_bottom">
            <div className="title">나의 총 보유 푸쉬</div>
            <div className="push_point">
              <span>{numberWithCommas(pgLog.have_push)}</span>
              <span>PUSH</span>
            </div>
          </div>
        </PushBody>
      ) : pgcode ? (
        <PushBody
          title="결제 완료"
          confirmText="확인"
          handleConfirm={() => _handleConfirm()}
        ></PushBody>
      ) : (
        // pgcode: undefined (오류)
        <PushBody
          title="결제 실패"
          cancelText="다시 결제하기"
          confirmText="확인"
          contentPaddingNone
          handleConfirm={() => _handleConfirm()}
          handleBack={() => _handleConfirm()}
        >
          <div className="top_middle_box failed">
            <span>결제처리에 실패하여</span>
            <span>결제를 완료하지 못했습니다.</span>
          </div>
        </PushBody>
      )}
      <style jsx>{`
        .category span:first-child {
          font-size: 14px;
          font-weight: normal;
          color: ${COLOR_696C8C};
        }
        .category span:last-child {
          font-size: 14px;
          font-weight: normal;
          color: #fff;
        }
        .top_middle_box {
          background-image: ${GRADIENT_2F3354_040221(180)};
          padding: 20px 40px;
        }

        .top_middle_box.failed {
          padding: 60px 0;
          text-align: center;
          font-size: 20px;
          line-height: 200%;
        }
        .top_middle_box.failed span {
          display: block;
        }
        .wrapper_top {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
          line-height: 28px;
        }
        .wrapper_top > div {
          position: relative;
        }
        .wrapper_top > div > span:last-child {
          position: absolute;
          right: 0;
        }
        .wrapper_middle {
          padding-top: 20px;
          text-align: right;
          line-height: 28px;
        }
        .wrapper_middle > div {
          position: relative;
        }
        .wrapper_middle > div > span:first-child {
          position: absolute;
          left: 0;
        }
        .wrapper_bottom {
          margin-top: 30px;
          border-radius: 10px;
          border: solid 1px transparent;
          background: linear-gradient(
                ${BACKGROUND_BLACK_COLOR},
                ${BACKGROUND_BLACK_COLOR}
              )
              padding-box,
            ${GRADIENT_00F1B4_D53CF5(90)} border-box;

          padding: 30px 20px;
        }
        .wrapper_bottom .title {
          color: ${COLOR_696C8C};
        }
        .wrapper_bottom > .push_point {
          font-size: 26px;
          font-weight: 700;
          height: 40px;
          line-height: 40px;
          text-align: right;
        }
        .wrapper_bottom > .push_point > span:last-child {
          color: #fff;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

ChargingCompleteComponent.propTypes = {
  pgLog: PropTypes.object,
};

export default ChargingCompleteComponent;
