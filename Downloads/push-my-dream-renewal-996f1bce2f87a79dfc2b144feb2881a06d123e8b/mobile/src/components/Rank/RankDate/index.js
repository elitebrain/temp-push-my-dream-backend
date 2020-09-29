import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getWeekOfMonth } from "shared/functions";
import { COLOR_696C8C } from "shared/constants/colors";

const RankDate = ({ tab, season, category3No }) => {
  const { category3List, category4List } = useSelector((state) => state.common);
  // default는 weekend
  const [startDate, setStartDate] = useState(
    moment().startOf("week").format("YYYY.MM.DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY.MM.DD"));

  useEffect(() => {
    // week
    if (tab === "week") {
      setStartDate(moment().startOf("week").format("YYYY.MM.DD"));
      setEndDate(moment().format("YYYY.MM.DD"));
    }
    // month
    else if (tab === "month") {
      setStartDate(moment().startOf("month").format("YYYY.MM.DD"));
      setEndDate(moment().format("YYYY.MM.DD"));
    }
    // season
    else if (tab === "season") {
      if (season) {
        setStartDate(moment(season.start_time).format("YYYY.MM.DD"));
        setEndDate(moment(season.end_time).format("YYYY.MM.DD"));
      } else {
        setStartDate("");
        setEndDate("");
      }
    }
    // producer
    else {
      const index = category3List
        .map((category) => category.category_level3_no)
        .indexOf(category3No);

      setStartDate(
        moment(category3List[index].start_time).format("YYYY.MM.DD")
      );
      setEndDate(moment(category3List[index].end_time).format("YYYY.MM.DD"));
    }
  }, [tab, season]);

  // 랭크 서브타이틀
  const subTitle = useMemo(() => {
    const category3index = category3List
      .map((category) => category.category_level3_no)
      .indexOf(Number(category3No));

    const category3Title =
      category3index === -1
        ? ""
        : category3List[category3index].category_level3;

    return tab === "season" ? season && season.title : category3Title;
  }, [tab, season, category3List, category3No, category4List]);

  return (
    <div className="rank_date_container">
      <div className="rank_date">
        <div className="left">
          {tab === "week"
            ? getWeekOfMonth(new Date()).format
            : tab === "month"
            ? getWeekOfMonth(new Date()).monthFormat
            : subTitle}
        </div>
        <div className="right">
          <span>{startDate}</span>
          <span>-</span>
          <span>{endDate}</span>
        </div>
      </div>
      <style jsx>{`
        .rank_date_container {
          box-sizing: border-box;
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 15px;
          font-size: 11px;
          color: ${COLOR_696C8C};
        }
        .rank_date {
          overflow: hidden;
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 17px;
          line-height: 17px;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
        }
        .right span {
          display: inline-block;
        }
        .right span:nth-child(2) {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
};

RankDate.propTypes = {
  tab: PropTypes.string.isRequired,
  category3No: PropTypes.number.isRequired,
};

export default RankDate;
