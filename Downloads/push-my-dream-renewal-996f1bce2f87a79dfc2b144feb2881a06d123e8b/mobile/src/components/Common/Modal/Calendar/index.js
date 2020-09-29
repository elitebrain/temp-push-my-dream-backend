import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { dateToKorYYM, dateToDashYYMD } from "shared/functions";
import PushModal from "../PushModal";
import { COLOR_696C8C } from "shared/constants/colors";

const Calendar = (props) => {
  const {
    closeCalendarModal,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handlePeriod,
  } = props;
  const [arrMonth, setArrMonth] = useState([]);
  const [arrWeeks, setArrWeeks] = useState([]);
  const [thisMonth, setThisMonth] = useState("");
  const [baseDate, setBaseDate] = useState(new Date());
  const [gubun, setGubun] = useState("startDate");
  useEffect(() => {
    const firstDay =
      gubun === "startDate"
        ? new Date(
            startDate.substr(0, 4),
            parseInt(startDate.substr(5, 2), 10) - 1,
            1
          )
        : new Date(
            endDate.substr(0, 4),
            parseInt(endDate.substr(5, 2), 10) - 1,
            1
          );
    _setCalendar(firstDay);
  }, [gubun]);
  const _handleMonth = (direction) => {
    if (direction === "prev") {
      const firstDay = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() - 1,
        1
      );
      _setCalendar(firstDay);
    } else if (direction === "next") {
      const firstDay = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + 1,
        1
      );
      _setCalendar(firstDay);
    }
  };
  const _setCalendar = (firstDay) => {
    const thisMonth = dateToKorYYM(firstDay);
    const lastDay = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth() + 1,
      0
    );
    const arrMonth = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      arrMonth.push(0);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      arrMonth.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i));
    }
    const arrWeeks = [];
    const firstWeeks = [];
    const secondWeeks = [];
    const thirdWeeks = [];
    const fourthWeeks = [];
    const fifthWeeks = [];
    const sixthWeeks = [];
    for (let i = 0; i < arrMonth.length; i++) {
      if (i < 7) {
        firstWeeks.push(arrMonth[i]);
      } else if (i < 14) {
        secondWeeks.push(arrMonth[i]);
      } else if (i < 21) {
        thirdWeeks.push(arrMonth[i]);
      } else if (i < 28) {
        fourthWeeks.push(arrMonth[i]);
      } else if (i < 35) {
        fifthWeeks.push(arrMonth[i]);
      } else {
        sixthWeeks.push(arrMonth[i]);
      }
    }
    let leftZeroLength;
    if (arrMonth.length < 36) {
      leftZeroLength = 7 - fifthWeeks.length;
      for (let i = 0; i < leftZeroLength; i++) {
        fifthWeeks.push(0);
      }
      for (let i = 0; i < 7; i++) {
        sixthWeeks.push(0);
      }
    } else {
      leftZeroLength = 7 - sixthWeeks.length;
      for (let i = 0; i < leftZeroLength; i++) {
        sixthWeeks.push(0);
      }
    }
    arrWeeks.push(
      firstWeeks,
      secondWeeks,
      thirdWeeks,
      fourthWeeks,
      fifthWeeks,
      sixthWeeks
    );
    setBaseDate(firstDay);
    setThisMonth(thisMonth);
    setArrWeeks(arrWeeks);
    setArrMonth(arrMonth);
  };
  const _handleDate = (date) => {
    if (date === 0) {
      return;
    } else if (gubun === "startDate") {
      setStartDate(dateToDashYYMD(date));
      setGubun("endDate");
    } else {
      if (dateToDashYYMD(date) < startDate) {
        setEndDate(startDate);
        setStartDate(dateToDashYYMD(date));
      } else {
        setEndDate(dateToDashYYMD(date));
      }
      handlePeriod("direct");
      closeCalendarModal();
    }
  };
  return (
    <PushModal
      closePushModal={() => closeCalendarModal()}
      title={
        gubun === "startDate" ? "시작일을 선택하세요." : "종료일을 선택하세요."
      }
      modalHeight={379}
      containerPadding="17px 20px"
      headerHeight={20}
      headerFontSize={14}
    >
      <div className="push_modal no_drag">
        <div className="period">
          {`시작일 : `}
          <span className="date">{startDate}</span>
        </div>
        <div className="period">
          {`종료일 : `}
          <span className="date">{endDate}</span>
        </div>
        <div className="row1mt_20px">
          <span className="col" onCli1k={() => _handleMonth("prev")}>
            ◀
          </span>
          <span className="year">{thisMonth}</span>
          <span className="col" onClick={() => _handleMonth("next")}>
            ▶
          </span>
        </div>
        <div className="row">
          <span className="col">일</span>
          <span className="col">월</span>
          <span className="col">화</span>
          <span className="col">수</span>
          <span className="col">목</span>
          <span className="col">금</span>
          <span className="col">토</span>
        </div>
        {arrWeeks &&
          arrWeeks.map((weeks, i) => (
            <div key={`weeks_${i}`} className="row">
              {weeks.map((item, j) => (
                <span
                  key={`days_${i}_${j}`}
                  className="col"
                  style={{
                    fontWeight:
                      (item !== 0 && startDate === dateToDashYYMD(item)) ||
                      (item !== 0 && endDate === dateToDashYYMD(item))
                        ? 700
                        : 400,
                    // color:
                    //   (item !== 0 && startDate === dateToDashYYMD(item)) ||
                    //   (item !== 0 && endDate === dateToDashYYMD(item))
                    //     ? "#f38400"
                    //     : "#aaa",
                    color: `${COLOR_696C8C}`,
                  }}
                  onClick={() => _handleDate(item)}
                >
                  {item !== 0 && item.getDate()}
                </span>
              ))}
            </div>
          ))}
      </div>
      <style jsx>{`
        .push_modal {
          width: 245px;
          margin: auto;
          color: ${COLOR_696C8C};
          padding-top: 4px;
        }
        .row > .col,
        .year {
          display: inline-block;
          vertical-align: middle;
          height: 35px;
          line-height: 35px;
          text-align: center;
        }
        .row {
          height: 35px;
          line-height: 35px;
          font-weight: 400;
        }
        .row > .col {
          width: 35px;
        }
        .mt_10px {
          margin-top: 10px;
        }
        .period {
          font-size: 12px;
        }
        .period > .date {
          color: #fff;
        }
        .noti {
          text-align: center;
        }
        .noti > span {
          color: #fff;
        }
        .year {
          width: 175px;
          font-size: 20px;
          font-weight: 700;
        }
      `}</style>
    </PushModal>
  );
};

Calendar.propTypes = {
  closeCalendarModal: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  handlePeriod: PropTypes.func,
};

export default Calendar;
