import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import {
  COLOR_696C8C,
  COLOR_AE46E7,
  BACKGROUND_BLACK_COLOR,
} from "shared/constants/colors";
import NewButton from "./NewButton";

const LogSearchCondition = (props) => {
  const {
    periodGubun,
    handlePeriod,
    handleClick,
    selectEl,
    openCalendarModal,
  } = props;
  return (
    <div className="condition">
      <div className="radio">
        <span
          className="content_box"
          onClick={() => handlePeriod("week")}
          style={{
            color:
              periodGubun === "week" ? `${COLOR_AE46E7}` : `${COLOR_696C8C}`,
            fontWeight: periodGubun === "week" ? "bold" : "normal",
          }}
        >
          <span className="title">1주일</span>
          <span
            className="under_line"
            style={{
              display: periodGubun === "week" ? "block" : "none",
            }}
          />
        </span>
        <span
          className="content_box"
          onClick={() => handlePeriod("month")}
          style={{
            color:
              periodGubun === "month" ? `${COLOR_AE46E7}` : `${COLOR_696C8C}`,
            fontWeight: periodGubun === "month" ? "bold" : "normal",
          }}
        >
          <span className="title">1개월</span>
          <span
            className="under_line"
            style={{ display: periodGubun === "month" ? "block" : "none" }}
          />
        </span>
        <span
          className="content_box"
          onClick={() => handlePeriod("threemonth")}
          style={{
            color:
              periodGubun === "threemonth"
                ? `${COLOR_AE46E7}`
                : `${COLOR_696C8C}`,
            fontWeight: periodGubun === "threemonth" ? "bold" : "normal",
          }}
        >
          <span className="title">3개월</span>
          <span
            className="under_line"
            style={{ display: periodGubun === "threemonth" ? "block" : "none" }}
          />
        </span>
        <span
          className="content_box"
          // onClick={() => handlePeriod("direct")}
          onClick={() => openCalendarModal()}
          style={{
            color: periodGubun === "direct" ? `${COLOR_AE46E7}` : "#696C8C",
            fontWeight: periodGubun === "direct" ? "bold" : "normal",
          }}
        >
          <span className="title">직접입력</span>
          <span
            className="under_line"
            style={{ display: periodGubun === "direct" ? "block" : "none" }}
          />
        </span>
      </div>
      {selectEl}
      <div>
        <NewButton
          height="35px"
          bgColor={BACKGROUND_BLACK_COLOR}
          gradient
          onClick={handleClick}
          stlye={{ fontWeight: "normal" }}
        >
          조회
        </NewButton>
      </div>
      <style jsx>{`
        .condition {
          margin: 10px 0;
        }
        .radio {
          margin-bottom: 17px;
        }
        .radio > .content_box {
          display: inline-block;
          vertical-align: middle;
          width: 25%;
          font-size: 16px;
          height: 25px;
          line-height: 20px;
          text-align: center;
          box-sizing: border-box;
          position: relative;
        }
        .radio > .content_box:last-child {
          border-right: none;
        }
        .under_line {
          width: 100%;
          height: 1px;
          position: absolute;
          bottom: -2px;
          left: 0;
          background-image: linear-gradient(90deg, #00f1b4 0%, #d53cf5 100%);
        }
      `}</style>
    </div>
  );
};

LogSearchCondition.propTypes = {
  periodGubun: PropTypes.string,
  handlePeriod: PropTypes.func,
  handleClick: PropTypes.func,
  openCalendarModal: PropTypes.func,
  selectEl: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default LogSearchCondition;
