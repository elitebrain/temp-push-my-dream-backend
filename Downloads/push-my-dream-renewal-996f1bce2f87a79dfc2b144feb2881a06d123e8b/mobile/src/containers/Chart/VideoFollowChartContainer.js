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

const VideoFollowChartContainer = ({ userNo, season, lineChartWidth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [period] = useState("season");
  const [data, setData] = useState(null);

  /**
   * 데이터 조회
   */
  useEffect(() => {
    let isCancelled = false;

    if (season && userNo) {
      fetchData();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function fetchData() {
      try {
        if (!isCancelled) {
          setIsLoading(true);

          const result = await userApi.get(`/${userNo}/chart/videoFollow`, {
            params: {
              period,
              category3No: season.category_level3_no,
            },
          });

          if (!isCancelled) {
            setData(result.data.data);
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
  }, [period, userNo, season]);

  /**
   * 데이터 캐싱
   */
  const lineData = useMemo(
    () =>
      data &&
      data.map((v) => ({
        no: v.date,
        date: v.date,
        value: v.lineValue,
      })),
    [data]
  );

  const barData = useMemo(
    () =>
      data &&
      data.map((v) => ({
        no: v.date,
        date: v.date,
        value: v.value,
      })),
    [data]
  );

  // 좌측 값 캐싱
  const axisLeftCount = useMemo(() => {
    const uniqueValue = Array.from(
      new Set(data && data.filter((v) => v.lineValue).map((v) => v.lineValue))
    ).length;

    return uniqueValue >= 7 ? 7 : uniqueValue;
  }, [data]);

  // 우측 값 캐싱
  const axisRightCount = useMemo(() => {
    const uniqueValue = Array.from(
      new Set(data && data.filter((v) => v.value).map((v) => v.value))
    ).length;

    return uniqueValue >= 7 ? 7 : uniqueValue;
  }, [data]);

  return (
    <div className="section">
      <SectionHeader
        title="VideoFollow"
        period={period}
        gubun="videoFollow"
        isDisabledWeek
        isDisabledMonth
      />
      <div className="wrapper">
        <div className="noti">
          등록된 비디오 수와 발생된 follow 수를 표시합니다.
        </div>
        {isLoading ? (
          <div className="LoaderWrapper">
            <Loader />
          </div>
        ) : data ? (
          <LineChart
            // db 연결 -> rankPeriod에 따른 db 호출
            barData={barData}
            lineData={lineData}
            width={lineChartWidth}
            axisLeftCount={axisLeftCount}
            axisRightCount={axisRightCount}
            strokeWidth={2}
            axisRightWidth={35}
            strokeColor="#ae46e7"
            svgFilter={`drop-shadow(2px 2px rgba(0,0,0, 0.2))`}
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

VideoFollowChartContainer.propTypes = {
  userNo: PropTypes.number.isRequired,
  season: PropTypes.shape({
    category_level3_no: PropTypes.number,
    category_level4_no: PropTypes.number,
  }),
};

export default VideoFollowChartContainer;
