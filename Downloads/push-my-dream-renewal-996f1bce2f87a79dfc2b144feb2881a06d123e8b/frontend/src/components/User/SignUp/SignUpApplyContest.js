import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import select_ico from "public/assets/icon/select_arrow(gray).svg";

const SignUpApplyContest = props => {
  const {
    visible,
    applyState,
    handleApplyChange,
    contestCategoryList,
    style
  } = props;
  const [timeHM, setTimeHM] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        arr.push(`0${i}:00`);
      } else {
        arr.push(`${i}:00`);
      }
    }
    setTimeHM(arr);
  }, []);
  return (
    <div className={`apply_contest${visible ? " visible" : ""}`} style={style}>
      <div className="category">
        <span>신청 카테고리</span>
        <select
          id="categoryDreamerNo"
          value={applyState.categoryDreamerNo}
          onChange={handleApplyChange}
        >
          <option value="-">-</option>
          {contestCategoryList &&
            contestCategoryList.map(category => (
              <option
                key={category.category_level2_no}
                value={category.category_level2_no}
              >
                PUSH My {category.category_level2}
              </option>
            ))}
        </select>
      </div>
      <div className="time">
        <span>연락가능 시간</span>
        <select
          id="callableStartTime"
          value={applyState.callableStartTime}
          onChange={handleApplyChange}
        >
          <option value="-">-</option>
          {timeHM &&
            timeHM.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
        </select>
        <select
          id="callableEndTime"
          value={applyState.callableEndTime}
          onChange={handleApplyChange}
        >
          <option value="-">-</option>
          {timeHM &&
            timeHM.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
        </select>
      </div>
      <div className="phone_number">
        <span>연락가능 번호</span>
        <select
          id="phoneFirst"
          value={applyState.phoneFirst}
          onChange={handleApplyChange}
        >
          <option>010</option>
        </select>
        <input
          id="phoneSecond"
          type="text"
          maxLength="8"
          value={applyState.phoneSecond}
          onChange={handleApplyChange}
        />
      </div>
      <style jsx>{`
        .apply_contest {
          width: 575px;
          height: 0;
          visibility: hidden;
          margin: 0 auto;
        }
        .apply_contest.visible {
          visibility: visible;
          height: auto;
        }
        .apply_contest div {
          margin-bottom: 20px;
        }
        .apply_contest div:last-child {
          margin-bottom: 0;
        }
        .apply_contest span {
          font-size: 16px;
          color: #fff;
          margin-right: 10px;
        }
        .apply_contest select {
          height: 60px;
          border-radius: 15px;
          padding-left: 30px;
          box-sizing: border-box;
          border: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        .apply_contest .category select {
          width: 470px;
          background: url(${select_ico}) 94% / 15px no-repeat #fff;
        }
        .apply_contest .time select {
          width: 230px;
          background: url(${select_ico}) 88% / 15px no-repeat #fff;
        }
        .apply_contest .time select:nth-child(2) {
          margin-right: 10px;
        }
        .apply_contest .phone_number select {
          width: 130px;
          margin-right: 10px;
          background: url(${select_ico}) 85% / 15px no-repeat #fff;
        }
        .apply_contest .phone_number input {
          width: 330px;
          height: 60px;
          border-radius: 15px;
          padding-left: 30px;
          box-sizing: border-box;
          border: none;
        }
      `}</style>
    </div>
  );
};

SignUpApplyContest.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  applyState: PropTypes.object,
  handleApplyChange: PropTypes.func,
  contestCategoryList: PropTypes.array
};

export default SignUpApplyContest;
