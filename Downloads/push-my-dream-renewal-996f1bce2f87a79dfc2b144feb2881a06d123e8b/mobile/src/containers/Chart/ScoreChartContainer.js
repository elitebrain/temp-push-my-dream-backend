import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import SectionHeader from "components/Common/Chart/SectionHeader";
import PieChart from "components/Common/Chart/PieChart";
import Loader from "components/Common/Loader";

import {
  GRADIENT_2F3354_040221,
  COLOR_696C8C,
  COLOR_979CCA,
  COLOR_28C9A0,
  COLOR_AE46E7,
  COLOR_666666,
  FONT_WHITE_COLOR,
} from "shared/constants/colors";
import { userApi } from "shared/api";

const ScoreChartContainer = ({ userNo, category3No }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  /**
   * 데이터 조회
   */
  useEffect(() => {
    let isCancelled = false;

    if (category3No && userNo) {
      fetchData();
    }

    return function cleanup() {
      isCancelled = true;
    };

    async function fetchData() {
      try {
        if (!isCancelled) {
          setIsLoading(true);

          const result = await userApi.get(`/${userNo}/chart/score`, {
            params: {
              category3No,
            },
          });

          // setData(null);
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
  }, [userNo, category3No]);

  const setting = useMemo(
    () => [
      {
        caption: data && {
          text: `${data[0].data[0].value}%`,
          color: FONT_WHITE_COLOR,
        },
        title: { text: "View", color: COLOR_979CCA },
        colors: [COLOR_28C9A0, "#2E2E3E"],
      },
      {
        caption: data && {
          text: `${data[1].data[0].value}%`,
          color: FONT_WHITE_COLOR,
        },
        title: { text: "Like", color: COLOR_979CCA },
        colors: [COLOR_28C9A0, "#2E2E3E"],
      },
      {
        caption: data && {
          text: `${data[2].data[0].value}%`,
          color: FONT_WHITE_COLOR,
        },
        title: { text: "Push", color: COLOR_979CCA },
        colors: [COLOR_AE46E7, "#2E2E3E"],
      },
    ],
    [data]
  );
  console.log("data", data);
  return (
    <div className="section">
      <SectionHeader title="SCORE" />
      <div className="wrapper">
        <div className="noti">항목별 상위% 위치를 표시합니다.</div>
        {isLoading ? (
          <div className="LoaderWrapper">
            <Loader />
          </div>
        ) : data ? (
          <>
            <div className="item" style={{ marginRight: "15px" }}>
              <PieChart
                data={data[0].data}
                width={78}
                height={78}
                innerRadius={33}
                outerRadius={39}
                caption={setting[0].caption}
                title={setting[0].title}
                colors={setting[0].colors}
              />
            </div>
            <div className="item" style={{ marginRight: "15px" }}>
              <PieChart
                data={data[1].data}
                width={78}
                height={78}
                innerRadius={33}
                outerRadius={39}
                caption={setting[1].caption}
                title={setting[1].title}
                colors={setting[1].colors}
              />
            </div>
            <div className="item">
              <PieChart
                data={data[2].data}
                width={78}
                height={78}
                innerRadius={33}
                outerRadius={39}
                caption={setting[2].caption}
                title={setting[2].title}
                colors={setting[2].colors}
              />
            </div>
          </>
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

        .wrapper .item {
          display: inline-block;
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

ScoreChartContainer.propTypes = {
  userNo: PropTypes.number,
  category3No: PropTypes.number,
};

export default ScoreChartContainer;
