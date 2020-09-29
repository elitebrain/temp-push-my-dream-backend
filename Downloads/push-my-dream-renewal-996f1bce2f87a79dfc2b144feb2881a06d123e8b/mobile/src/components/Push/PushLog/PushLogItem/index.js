import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { numberWithCommasAndCheckNone } from "shared/functions";

import { COLOR_696C8C } from "shared/constants/colors";
import supportIcon from "public/assets/image/icon_wing_white.png";

const PushLogItem = ({ log }) => {
  return (
    <div key={log.push_log_no} className="item">
      <div className="date_time">
        <span className="yymd">
          {moment(log.created_at).format("YYYY-MM-DD")}
        </span>
        <span className="hms">{moment(log.created_at).format("HH:mm:ss")}</span>
      </div>
      <div className="dreamer_info">
        <span className="dreamer_name">{log.DREAMER.nickname}</span>
        {log.gubun === "SUPPORT" && (
          <div className="log_gubun">
            <div className="supportContainer">
              <span className="support">후원</span>
              <img className="supportImage" src={supportIcon} />
            </div>
          </div>
        )}
        <span className="push">{numberWithCommasAndCheckNone(log.push)}</span>
      </div>
      {log.gubun === "PUSH" && (
        <p className="categoryContainer">
          <span>{`${log.CATEGORY_LEVEL2.category_level2} ${log.CATEGORY_LEVEL3.category_level3}`}</span>
        </p>
      )}
      <div className="LogContainer">
        <span className="gain_point">
          <div className="title">POINT</div>
          <div>
            <span>획득</span>
            <span>{numberWithCommasAndCheckNone(log.gain_point)}</span>
          </div>
          <div>
            <span>보유계</span>
            <span>{numberWithCommasAndCheckNone(log.total_point)}</span>
          </div>
        </span>
        <span className="remaining_have_push">
          <div className="title">잔여 PUSH</div>
          <div>
            <span>일반</span>
            <span>{numberWithCommasAndCheckNone(log.remaining_have_push)}</span>
          </div>
          {log.gubun === "PUSH" && log.CATEGORY_LEVEL4.ordinalNumber > 1 && (
            <div>
              <span>{`${log.CATEGORY_LEVEL4.ordinalNumber}차 회수`}</span>
              <span>
                {numberWithCommasAndCheckNone(log.remaining_category_push)}
              </span>
            </div>
          )}
        </span>
      </div>
      <style jsx>{`
        .item {
          padding: 15px 18px;
          border-bottom: 0.5px solid rgba(57, 57, 74, 0.4);
        }

        .item:last-of-type {
          border-bottom: initial;
        }
        .item > div {
          position: relative;
        }
        .date_time {
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          margin-bottom: 5px;
        }
        .date_time > .yymd {
          color: #fff;
        }
        .date_time > .hms {
          color: #aaa;
          margin-left: 3px;
        }
        .dreamer_info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          line-height: 30px;
        }

        .dreamer_info .dreamer_name {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          margin-right: 10px;
        }

        .dreamer_info .log_gubun {
          flex: 1;
        }

        .dreamer_info .supportContainer {
          display: flex;
          align-items: center;
        }

        .dreamer_info .supportContainer .support {
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          color: ${COLOR_696C8C};
          margin-right: 7px;
        }

        .dreamer_info .supportContainer .supportImage {
          width: 17.5px;
          height: 14px;
        }
        .dreamer_info .push {
          font-size: 16px;
          color: #fff;
          font-weight: bold;
          text-align: right;
        }

        .categoryContainer {
          margin-bottom: 5px;
        }

        .categoryContainer span {
          font-size: 12px;
          line-height: 15px;

          color: ${COLOR_696C8C};
        }

        .LogContainer {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          height: 40px;
        }

        .gain_point {
          flex-basis: 110px;
        }

        .remaining_have_push {
          flex-basis: 130px;
        }

        .gain_point,
        .remaining_have_push {
          color: ${COLOR_696C8C};
          font-size: 10px;
        }
        .gain_point .title,
        .remaining_have_push .title {
          font-weight: bold;
        }

        .gain_point > div {
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .gain_point > div > span:first-child {
          flex-basis: 35px;
        }

        .gain_point > div > span:last-child {
          flex: 1;
          text-align: right;
        }

        .remaining_have_push > div {
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

PushLogItem.propTypes = {
  log: PropTypes.shape({
    push_log_no: PropTypes.number,
    created_at: PropTypes.string,
    push: PropTypes.number,
    gain_point: PropTypes.number,
    total_point: PropTypes.number,
    remaining_have_push: PropTypes.number,
    remaining_category_push: PropTypes.number,

    DREAMER: PropTypes.shape({
      nickname: PropTypes.string,
    }),
    CATEGORY_LEVEL2: PropTypes.shape({
      category_level2: PropTypes.string,
    }),
    CATEGORY_LEVEL3: PropTypes.shape({
      category_level3: PropTypes.string,
    }),
    CATEGORY_LEVEL4: PropTypes.shape({
      ordinalNumber: PropTypes.number,
    }),
  }),
};

export default PushLogItem;
