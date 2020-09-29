import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { numberWithCommas } from "shared/functions";
import List from "../List";
import {
  WHITE_COLOR,
  COLOR_696C8C,
  GRADIENT_2F3354_040221,
} from "shared/constants/colors";

// 주별 아이템
const ReceivePushInWeekItem = ({ week, month, index }) => {
  return (
    <div className="weeks" key={week.week}>
      <span className="month">{index === 0 ? `${month}월` : ""}</span>
      <span className="week">{week.weekNo}째주</span>
      <span className="push">
        {week.sum_push > 0 ? numberWithCommas(week.sum_push) : "-"}
      </span>
      <style jsx>{`
        .weeks {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: calc(100% - 105px);
          margin-bottom: 6px;
        }
        .weeks > span {
          display: inline-block;
          vertical-align: middle;
        }
        .month {
          flex-basis: 35px;
          margin-left: 5px;
        }
        .push {
          flex: 1;
          color: ${WHITE_COLOR};
          text-align: right;
        }
      `}</style>
    </div>
  );
};

ReceivePushInWeekItem.propTypes = {
  week: PropTypes.shape({
    week: PropTypes.number,
    weekNo: PropTypes.number,
    sum_push: PropTypes.number,
  }),
  month: PropTypes.number,
  index: PropTypes.number,
};

// 월별 아이템
const ReceivePushInMonthItem = ({ month }) => {
  // 렌더링 최적화
  const renderWeekItem = useCallback(
    (week, i) => (
      <ReceivePushInWeekItem
        key={i}
        week={week}
        index={i}
        month={month.month}
      />
    ),
    [month]
  );

  return (
    <div key={month.month}>
      <div className="total_push">
        <span className="dashed" />
        <span className="total_push_value">
          {month.totalPush > 0 ? numberWithCommas(month.totalPush) : "-"}
        </span>
      </div>
      <List list={month.weeks} renderItem={renderWeekItem} />
      <style jsx>{`
        .total_push {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 30px;
          font-weight: 700;
          color: ${WHITE_COLOR};
        }
        .dashed {
          flex: 1;
          border: 0.5px dashed #c9c9c9;
        }

        .total_push_value {
          flex-basis: 105px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

ReceivePushInMonthItem.propTypes = {
  month: PropTypes.shape({
    month: PropTypes.number,
    totalPush: PropTypes.number,
    weeks: PropTypes.array,
  }),
};

// 라운드별 아이템
const PushHistory = ({ round }) => {
  const { receivePushListInRound, ordinalNumber, start_time } = round;

  // 최적화
  const renderMonthItem = useCallback(
    (month, index) => <ReceivePushInMonthItem key={index} month={month} />,
    [round]
  );

  // 라운드별 총 푸쉬 합 캐싱
  const roundTotalPush = useMemo(
    () =>
      receivePushListInRound.reduce((prev, data) => prev + data.totalPush, 0),
    [receivePushListInRound]
  );
  return (
    <div className="round">
      <div className="total_push">
        <span className="title">{`ROUND ${ordinalNumber} 총 푸쉬`}</span>
        <span className="push">
          {roundTotalPush > 0 ? numberWithCommas(roundTotalPush) : "-"}
        </span>
      </div>
      <List list={receivePushListInRound} renderItem={renderMonthItem} />
      <div className="banner">{`ROUND ${ordinalNumber} 시작 ${moment(
        start_time
      ).format("YYYY.MM.DD")}`}</div>
      <style jsx>{`
        .round {
          font-size: 14px;
          color: ${COLOR_696C8C};
        }

        .total_push {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 30px;
        }
        .total_push .title {
          flex: 1;
          text-align: right;
          font-size: 12px;
          color: ${COLOR_696C8C};
        }
        .total_push .push {
          flex-basis: 105px;
          font-weight: 700;
          text-align: right;
          color: ${WHITE_COLOR};
        }

        .banner {
          background-image: ${GRADIENT_2F3354_040221(180)};
          font-size: 12px;
          text-align: center;
          color: ${COLOR_696C8C};
          height: 32px;
          line-height: 32px;
          margin: 15px 0;
        }
      `}</style>
    </div>
  );
};

PushHistory.propTypes = {
  round: PropTypes.shape({
    receivePushListInRound: PropTypes.array,
    ordinalNumber: PropTypes.number,
    start_time: PropTypes.string,
  }),
  startDate: PropTypes.string,
  pushHistory: PropTypes.array,
};

export default PushHistory;
