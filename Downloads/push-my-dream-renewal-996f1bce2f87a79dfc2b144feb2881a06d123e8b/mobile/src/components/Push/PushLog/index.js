import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import moment from "moment";

import Layout from "components/Layout/Layout";
import PushBody from "components/Layout/PushBody";
import List from "components/Common/List";
import PushLogItem from "./PushLogItem";
import LoadingCircle from "components/Common/CssIcons/LoadingCircle";
import LogSearchCondition from "components/Common/LogSearchCondition";
import Calendar from "components/Common/Modal/Calendar";

import { setPeriod } from "shared/functions";
import arrow_down_ico from "public/assets/icon/arrow_down_ico(purple).svg";
import calendar_ico from "public/assets/icon/calendar_ico(purple).svg";
import {
  COLOR_696C8C,
  COLOR_2F3354,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";

const PushLog = (props) => {
  const { loading, pushLog, getMyPushLog } = props;
  // week로 초기화
  const [startDate, setStartDate] = useState(
    moment().subtract(6, "day").format("YYYY-MM-DD")
  );
  // week로 초기화
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [categoryLevel2No, setCategoryLevel2No] = useState("");
  const [isDirectPeriod, setIsDirectPeriod] = useState(false);
  const [periodGubun, setPeriodGubun] = useState("week");
  const [isViewCalendar, setIsViewCalendar] = useState(false);
  const { categoryList } = useSelector((state) => state.common);
  const categoryLevel2List = categoryList[0].CATEGORY_LEVEL2;
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
    getMyPushLog(categoryLevel2No, startDate, endDate);
  };
  const _handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else {
      setCategoryLevel2No(value);
    }
  };
  const _openCalendarModal = () => {
    setIsViewCalendar(true);
    document.querySelector("body").style.overflow = "hidden";
  };
  const _closeCalendarModal = () => {
    setIsViewCalendar(false);
    setPeriodGubun("direct");
    document.querySelector("body").style.overflow = "auto";
  };

  /**
   * 최적화
   */
  const renderPushLogItem = useCallback(
    (log) => <PushLogItem key={log.push_log_no} log={log} />,
    []
  );

  return (
    <>
      <PushBody title="푸쉬 내역">
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
                <select value={categoryLevel2No} onChange={_handleChange}>
                  <option value="">카테고리 전체</option>
                  {categoryLevel2List &&
                    categoryLevel2List.map((item) => (
                      <option
                        key={item.category_level2_no}
                        value={item.category_level2_no}
                      >
                        {item.category_level2}
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
              <span className="count">총 {pushLog.length}건</span>
              <span className="right">PUSH</span>
            </div>
            <div className="content">
              <List
                empty={
                  <div className="Empty">푸쉬 내역이 존재하지 않습니다.</div>
                }
                list={pushLog}
                renderItem={renderPushLogItem}
              />
            </div>
          </div>
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
      </PushBody>
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
          background-image: ${GRADIENT_2F3354_040221(90)};
          border-radius: 10px;
        }
        .result > .header {
          position: relative;
          color: rgba(255, 255, 255, 0.5);
          border-bottom: 1px solid ${COLOR_2F3354};
          font-size: 12px;
          height: 30px;
          line-height: 30px;
        }
        .result > .header > .count {
          margin-left: 18px;
          font-weight: 400;
        }
        .result > .header > .right {
          position: absolute;
          top: 50%;
          right: 18px;
          transform: translateY(-50%);
          font-weight: 400;
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

PushLog.propTypes = {
  loading: PropTypes.bool,
  pushLog: PropTypes.array,
  getMyPushLog: PropTypes.func,
};

export default PushLog;
