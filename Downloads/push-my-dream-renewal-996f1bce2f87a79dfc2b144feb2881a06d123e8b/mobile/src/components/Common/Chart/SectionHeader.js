import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { COLOR_696C8C } from "shared/constants/colors";

const SectionHeader = (props) => {
  const {
    title,
    period,
    setPeriod,
    isDisabledWeek,
    isDisabledMonth,
    isDisabledSeason,
  } = props;

  /**
   * 기간 선택 캐싱
   */
  const isSelectedPeriodWeek = useMemo(
    () => ({
      color:
        String(period).toLowerCase() === "week".toLowerCase()
          ? "#AE46E7"
          : COLOR_696C8C,
    }),
    [period]
  );

  const isSelectedPeriodMonth = useMemo(
    () => ({
      color:
        String(period).toLowerCase() === "month".toLowerCase()
          ? "#AE46E7"
          : COLOR_696C8C,
    }),
    [period]
  );
  const isSelectedPeriodSeason = useMemo(
    () => ({
      color:
        String(period).toLowerCase() === "season".toLowerCase()
          ? "#AE46E7"
          : COLOR_696C8C,
    }),
    [period]
  );

  /**
   * 기간 변경 함수 캐싱
   */
  const onChangePeriodWeek = useCallback(() => {
    if (setPeriod) {
      setPeriod("week");
    }
  }, [setPeriod]);

  const onChangePeriodMonth = useCallback(() => {
    if (setPeriod) {
      setPeriod("month");
    }
  }, [setPeriod]);

  const onChangePeriodSeason = useCallback(() => {
    if (setPeriod) {
      setPeriod("season");
    }
  }, [setPeriod]);

  return (
    <div className="title">
      {title}
      {period && (
        <div className="period">
          {!isDisabledWeek && (
            <span style={isSelectedPeriodWeek} onClick={onChangePeriodWeek}>
              Week
            </span>
          )}
          {!isDisabledMonth && (
            <span style={isSelectedPeriodMonth} onClick={onChangePeriodMonth}>
              Month
            </span>
          )}
          {!isDisabledSeason && (
            <span style={isSelectedPeriodSeason} onClick={onChangePeriodSeason}>
              Season
            </span>
          )}
        </div>
      )}
      <style jsx>{`
        .title {
          position: relative;
          height: 25px;
          line-height: 27px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          padding-left: 15px;
          margin-top: 7px;
        }
        .title .period {
          position: absolute;
          right: 15px;
          top: calc(50% + 1px);
          transform: translateY(-50%);
          font-size: 11px;
          font-weight: 400;
        }
        .title .period > span {
          position: relative;
          display: inline-block;
          padding: 0 10px;
        }
        .title .period > span:last-child {
          padding-right: 0;
        }
        .title .period > span:last-child:after {
          display: none;
        }
        .title .period > span:after {
          position: absolute;
          content: "";
          height: 12px;
          border-right: 1px solid ${COLOR_696C8C};
          right: 0;
          top: calc(50% + 1px);
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  period: PropTypes.string,
  setPeriod: PropTypes.func,
  gubun: PropTypes.string,
  isDisabledWeek: PropTypes.bool,
  isDisabledMonth: PropTypes.bool,
  isDisabledSeason: PropTypes.bool,
};

export default React.memo(SectionHeader);
