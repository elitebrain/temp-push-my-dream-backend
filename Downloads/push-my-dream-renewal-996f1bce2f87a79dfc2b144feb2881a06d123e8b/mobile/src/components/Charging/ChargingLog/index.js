import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash/array";

import Layout from "components/Layout/Layout";
import PushBody from "components/Layout/PushBody";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import LogSearchCondition from "components/Common/LogSearchCondition";
import PushModal from "components/Common/Modal/PushModal";
import Calendar from "components/Common/Modal/Calendar";
import ChargingLogItem from "./ChargingLogItem";
import List from "components/Common/List";

import {
  numberWithCommas,
  dateToKorYYMDHMS,
  dateToKorYYMD,
  setPeriod,
} from "shared/functions";

import { GRADIENT_2F3354_040221, COLOR_696C8C } from "shared/constants/colors";
import arrow_down_ico from "public/assets/icon/arrow_down_ico(purple).svg";
import calendar_ico from "public/assets/icon/calendar_ico(purple).svg";

const pgcodeList = [
  { pgcode: "virtualaccount", pgname: "가상계좌" },
  { pgcode: "mobile", pgname: "모바일" },
  { pgcode: "creditcard", pgname: "신용카드" },
  { pgcode: "banktransfer", pgname: "인터넷뱅킹" },
];

const ChargingLog = (props) => {
  const { loading, chargingLog, getMyChargingLog } = props;
  const [startDate, setStartDate] = useState(
    moment().subtract(6, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [pgcode, setPgcode] = useState("");
  const [modalData, setModalData] = useState({});
  const [isViewModal, setIsViewModal] = useState(false);
  const [isViewCalendar, setIsViewCalendar] = useState(false);
  const [isDirectPeriod, setIsDirectPeriod] = useState(false);
  const [periodGubun, setPeriodGubun] = useState("week");
  useEffect(() => {
    _handleClick();
  }, []);
  useEffect(() => {
    setPeriod(periodGubun, setIsDirectPeriod, setEndDate, setStartDate);
  }, [periodGubun]);
  const _handlePeriod = (period) => {
    setPeriodGubun(period);
  };
  const _handleClick = () => {
    getMyChargingLog(pgcode, startDate, endDate);
  };
  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else {
      setPgcode(value);
    }
  };
  const _openModal = (item) => {
    setIsViewModal(true);
    setModalData(item);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeModal = () => {
    setIsViewModal(false);
    setModalData({});
    document.querySelector("body").style.overflow = "auto";
  };
  const _openCalendarModal = () => {
    setIsViewCalendar(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeCalendarModal = () => {
    setIsViewCalendar(false);
    document.querySelector("body").style.overflow = "auto";
  };

  /**
   * 최적화
   */
  const renderChargingLogItem = useCallback(
    (log) => (
      <ChargingLogItem
        key={log.pg_log_no}
        log={log}
        openModal={_openModal.bind(this, log)}
      />
    ),
    []
  );

  return (
    <>
      <PushBody title="충전 내역" handleBack={() => Router.back()}>
        <LogSearchCondition
          periodGubun={periodGubun}
          handlePeriod={_handlePeriod}
          handleClick={_handleClick}
          openCalendarModal={_openCalendarModal}
          selectEl={
            <div className="select">
              {/* <span>{startDate}</span>
              <span>{endDate}</span> */}
              <img src={calendar_ico} alt="calendar_ico(purple)" />
              <input
                type="text"
                name="startDate"
                value={startDate}
                onChange={_handleChange}
                readOnly={!isDirectPeriod}
              />
              <span>~</span>
              <input
                type="text"
                name="endDate"
                value={endDate}
                onChange={_handleChange}
                readOnly={!isDirectPeriod}
              />
              <div className="select_box">
                <select value={pgcode} onChange={_handleChange}>
                  <option value="">카테고리 전체</option>
                  {pgcodeList &&
                    pgcodeList.map((item) => (
                      <option key={item.pgcode} value={item.pgcode}>
                        {item.pgname}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          }
        />
        {loading ? (
          <LoadingCircle />
        ) : (
          <div className="result">
            <div className="header">
              <span className="count">총 {chargingLog.length}건</span>
              <span className="right">WON</span>
            </div>
            <List
              empty={
                <div className="Empty">충전 내역이 존재하지 않습니다.</div>
              }
              list={chargingLog}
              renderItem={renderChargingLogItem}
            />
          </div>
        )}
      </PushBody>
      {isViewModal && (
        <PushModal
          closePushModal={() => _closeModal()}
          title={
            pgcodeList[
              _.findIndex(pgcodeList, (v) => v.pgcode === modalData.pgcode)
            ].pgname
          }
          confirmText="확인"
          handleConfirm={_closeModal}
        >
          <div className="modal_body">
            <div className="top">
              <div>
                <span>발급 일시</span>
                <span>{dateToKorYYMDHMS(new Date(modalData.created_at))}</span>
              </div>
              <div>
                <span>방법</span>
                <span>
                  {
                    pgcodeList[
                      _.findIndex(
                        pgcodeList,
                        (v) => v.pgcode === modalData.pgcode
                      )
                    ].pgname
                  }
                </span>
              </div>
            </div>
            <div className="bottom">
              <div>
                <span>은행</span>
                <span>{modalData.bank_name || "-"}</span>
              </div>
              <div>
                <span>계좌</span>
                <span>{modalData.pay_info || "-"}</span>
              </div>
              <div>
                <span>예금주</span>
                <span>(주)칸컴스</span>
              </div>
              <div>
                <span>금액</span>
                <span>{numberWithCommas(modalData.amount)} 원</span>
              </div>
              <div>
                <span>기한</span>
                <span>
                  {modalData.expire_date
                    ? dateToKorYYMD(new Date(modalData.expire_date))
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </PushModal>
      )}
      {isViewCalendar && (
        <Calendar
          closeCalendarModal={_closeCalendarModal}
          handlePeriod={_handlePeriod}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          border: initial;
        }
        .select {
          margin-bottom: 15px;
          text-align: right;
          line-height: 27px;
          color: rgba(255, 255, 255, 0.73);
        }
        select > option {
          color: #000;
        }
        .select > input {
          background-color: initial;
          color: rgba(255, 255, 255, 0.73);
          width: 82px;
        }
        .select > input {
          width: 100px;
          height: 30px;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          border: 1px solid ${COLOR_696C8C};
          border-radius: 5px;
          color: ${COLOR_696C8C};
          padding: 0 4px;
        }
        .select span {
          display: inline-block;
          vertical-align: middle;
          margin: 0 5px;
          color: ${COLOR_696C8C};
        }
        .select select {
          width: 140px;
          height: 30px;
          margin-top: 20px;
          padding: 0 5px;
          font-size: 12px;
          border: 1px solid ${COLOR_696C8C};
          border-radius: 5px;
          color: ${COLOR_696C8C};
          background-color: transparent;
          background: url(${arrow_down_ico}) no-repeat 95% 50%;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .select img {
          width: 25px;
          height: 20px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: bottom;
        }
        .result {
          margin: 20px 0;
          border-radius: 10px;
          background-image: ${GRADIENT_2F3354_040221(90, "-15.95%", "77.03%")};
        }
        .result > .header {
          position: relative;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .result > .header > .count {
          margin-left: 18px;
        }
        .result > .header > .right {
          position: absolute;
          top: 50%;
          right: 18px;
          transform: translateY(-50%);
        }
        .item {
          padding: 15px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .item > div {
          position: relative;
        }
        .date_time {
          position: relative;
          font-size: 10px;
          line-height: 12px;
        }
        .date_time > .yymd {
          color: #fff;
        }
        .date_time > .hms {
          color: #aaa;
          margin-left: 3px;
        }
        .date_time > .push {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          color: #aaa;
        }
        .pg_name {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          line-height: 20px;
          color: #fff;
          margin-right: 5px;
        }
        .amount {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
        }
        .amount > img,
        .amount > span {
          display: inline-block;
          vertical-align: middle;
        }
        .waiting_badge {
          background-color: #fff;
          border-radius: 4px;
          margin-left: 10px;
          margin-right: 10px;
          font-size: 10px;
          color: #000;
          padding: 2px 4px;
        }

        .modal_header {
          width: calc(100% + 40px);
          background-color: #fff;
          margin-left: -20px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          color: #222;
          font-size: 22px;
          font-weight: 700;
        }
        .modal_body {
          font-size: 14px;
          color: #fff;
          box-sizing: border-box;
          width: 100%;
          padding-top: 20px;
          line-height: 28px;
        }
        .modal_body > div > div {
          position: relative;
        }
        .top {
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bottom {
          margin-top: 20px;
        }
        .top > div > span:last-child,
        .bottom > div > span:last-child {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .Empty {
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${COLOR_696C8C};
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

ChargingLog.propTypes = {
  loading: PropTypes.bool,
  chargingLog: PropTypes.array,
  getMyChargingLog: PropTypes.func,
};

export default ChargingLog;
