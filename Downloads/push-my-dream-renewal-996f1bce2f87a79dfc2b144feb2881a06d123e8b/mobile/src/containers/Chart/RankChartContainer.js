import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import SectionHeader from "components/Common/Chart/SectionHeader";
import LineChart from "components/Common/Chart/LineChart";
import Loader from "components/Common/Loader";

import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  COLOR_666666,
} from "shared/constants/colors";
import { userApi } from "shared/api";

const RankChartContainer = ({
  userNo,
  category3No,
  category4No,
  lineChartWidth,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState("week");
  const [data, setData] = useState(null);

  /**
   * 데이터 조회
   */
  useEffect(() => {
    let isCancelled = false;

    if (category3No && category4No && userNo && period) {
      fetchData();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function fetchData() {
      try {
        if (!isCancelled) {
          setIsLoading(true);

          const result = await userApi.get(`/${userNo}/chart/rank`, {
            params: {
              period,
              category3No,
              category4No,
            },
          });

          // setData(null);
          if (!isCancelled) {
            setData(result.data.data.map((v) => ({ ...v, no: v.date })));
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error(error);
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }
  }, [period, userNo, category3No, category4No]);

  /**
   * 기간 변경
   */
  const onChangePeriod = useCallback((_period) => {
    setPeriod(String(_period).toLowerCase());
  }, []);

  // 좌측 값 캐싱
  const axisLeftCount = useMemo(() => {
    const uniqueValue = Array.from(new Set(data && data.map((v) => v.value)))
      .length;

    return uniqueValue >= 7 ? 7 : uniqueValue;
  }, [data]);

  return (
    <div className="section">
      <SectionHeader
        title="RANK"
        period={period}
        setPeriod={onChangePeriod}
        gubun="rank"
      />
      <div className="wrapper">
        <div className="noti">일자별 시즌 순위를 표시 합니다.</div>
        {isLoading ? (
          <div className="LoaderWrapper">
            <Loader />
          </div>
        ) : data ? (
          <LineChart
            // db 연결 -> rankPeriod에 따른 db 호출
            lineData={data}
            axisLeftCount={axisLeftCount}
            width={lineChartWidth}
            strokeWidth={2}
            strokeColor="#00F1B4"
            svgFilter={`drop-shadow(2px 2px rgba(0,0,0, 0.2))`}
            reverse
          />
        ) : (
          <div className="Notice">데이터가 존재하지 않습니다.</div>
        )}
      </div>
      <style jsx>{`
        .section {
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 30px;
          background: ${GRADIENT_2F3354_040221(180, "-27.85%", "68.61%")};
        }
        .wrapper {
          font-family: "Montserrat";
          text-align: center;
          padding-bottom: 18px;
        }
        .wrapper > .noti {
          font-size: 10px;
          color: ${COLOR_696C8C};
          margin: 0 10px 20px;
          text-align: left;
        }

        .LoaderWrapper {
          width: 100%;
          height: 194px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Notice {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          color: ${COLOR_666666};

          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

RankChartContainer.propTypes = {
  userNo: PropTypes.number.isRequired,
  category3No: PropTypes.number,
  category4No: PropTypes.number,
  lineChartWidth: PropTypes.number,
};

export default RankChartContainer;
